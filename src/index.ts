import express from 'express';
import path from 'path';
import imgProcess from './util/imageProcess';

const app = express();
const port = 3000;

app.get('/api/images', async (req, res) => {

    const filename = (req.query.filename as unknown) as string | undefined;

    if (!filename) {
        res.status(400).send('Error: missing filename parameter');
        return;
    } else if (!req.query.width || !req.query.height) {
        res.status(400).send('Error: missing width or height parameters');
        return;
    }

    const width = parseInt(req.query.width!.toString());
    const height = parseInt(req.query.height!.toString());

    if (width <= 0 || height <= 0 || Number.isNaN(width) || Number.isNaN(height)) {
        res.status(400).send('Error: invalid width or height parameters');
        return;
    }

    if (!await imgProcess.IsImageCached(filename, width, height)) {
        console.log('NOT CACHED')
        try {
            await imgProcess.ResizeImage(filename, width, height)
        } catch(err) {
            res.status(404).send((err as object).toString());
            return;
        }
    }

    const newPath = `assets/thumb/${width}w_${height}h_${filename}`;
    res.sendFile(path.join(`${__dirname}/..`, newPath));
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})

export = app;