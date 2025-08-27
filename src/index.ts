import express from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

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

    if (width <= 0 || height <= 0) {
        res.status(400).send('Error: invalid width or height parameters');
        return;
    }

    const newPath = `assets/thumb/${width}w_${height}h_${filename}`;

    try {
        await fs.access(newPath);
    } catch (err) {
        try {
            await sharp(`assets/full/${filename}`).resize(width, height).toFile(newPath);
        } catch (err) {
            res.status(404).send(`Error: ${filename} doesn't exist`);
            return;
        }
    }

    res.sendFile(path.join(`${__dirname}/..`, newPath));
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})