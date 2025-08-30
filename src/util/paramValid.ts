import express from 'express';

const ValidateParameters = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const filename = req.query.filename;
    if (!filename)
        return res.status(400).send('Error: missing filename parameter');

    const width = parseInt(req.query.width!.toString());
    const height = parseInt(req.query.height!.toString());

    if (!req.query.width || !req.query.height)
        res.status(400).send('Error: missing width or height parameters');

    if (width <= 0 || height <= 0 || Number.isNaN(width) || Number.isNaN(height))
        res.status(400).send('Error: invalid width or height parameters');

    next();
}

export = ValidateParameters;