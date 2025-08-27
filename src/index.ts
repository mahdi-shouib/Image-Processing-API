import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

app.get('/api/images', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../assets/thumb/`, 'thumb.jpg'));
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})