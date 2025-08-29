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

const DeleteCachedImage = (filename: string): void => {
	fs.readdir('./assets/thumb', (err, files) => {
		if (err) throw Error();

		files.filter(f => f.endsWith(filename))
		.forEach(img => {
			fs.unlink(`./assets/thumb/${img}`, (err) => {
				if(err) throw err;
			})
		})
	})
}

const ResizeImage = async (filename: string, width: number, height: number): Promise<void> => {

    if(!CheckFullImage(filename)) throw Error(`${filename} doesn't exist`);

	const imgPath = `assets/full/${filename}`;
	const newPath = `assets/thumb/${width}w_${height}h_${filename}`;
	await sharp(imgPath).resize(width, height).toFile(newPath);
}

export = {
	CheckFullImage,
    ResizeImage,
    IsImageCached,
	DeleteCachedImage
};