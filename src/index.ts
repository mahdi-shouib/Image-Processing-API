import express from 'express';
import path from 'path';
import ValidateParameters from './util/paramValid';

const app = express();
const port = 3000;

app.get('/api/images', ValidateParameters, async (req, res) => {

    const filename = req.query.filename as unknown as string | undefined;
    const width = parseInt(req.query.width!.toString());
    const height = parseInt(req.query.height!.toString());

    const newPath = `assets/thumb/${width}w_${height}h_${filename}`;
    res.sendFile(path.join(`${__dirname}/..`, newPath));
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})

export = app;