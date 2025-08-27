import express from 'express';
import sharp from 'sharp';
import path from 'path';

const app = express();
const port = 3000;

app.get('/api/images', async (req, res) => {

    const filename = (req.query.filename as unknown) as string | undefined;
    const width = (typeof req.query.width === 'string')? parseInt(req.query.width) : undefined;
    const height = (typeof req.query.height === 'string')? parseInt(req.query.height) : undefined;
    const newPath = `assets/thumb/${width}w_${height}h_${filename}`;

    await sharp(`assets/full/${filename}`).resize(width, height).toFile(newPath)

    res.sendFile(path.join(`${__dirname}/..`, newPath));
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})