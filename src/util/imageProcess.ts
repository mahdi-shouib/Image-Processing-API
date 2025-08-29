import fs from 'fs';
import sharp from 'sharp';

const CheckFullImage = (filename: string): boolean => {
	const imgPath = `assets/full/${filename}`;
	return fs.existsSync(imgPath);
};

const IsImageCached = (filename: string, width: number, height: number): boolean => {
    const imgPath = `assets/thumb/${width}w_${height}h_${filename}`;
	return fs.existsSync(imgPath);
}

const ResizeImage = (filename: string, width: number, height: number): Promise<sharp.OutputInfo> | undefined => {

    if(!CheckFullImage(filename) || width <= 0 || height <= 0) return;

	const imgPath = `assets/full/${filename}`;
	const newPath = `assets/thumb/${width}w_${height}h_${filename}`;
	return sharp(imgPath).resize(width, height).toFile(newPath);
}

export = {
	CheckFullImage,
    ResizeImage,
    IsImageCached
};