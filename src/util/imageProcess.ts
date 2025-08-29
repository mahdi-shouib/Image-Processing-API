import fs from 'fs';

const CheckFullImage = (filename: string): boolean => {
	const imgPath = `assets/full/${filename}`;
	return fs.existsSync(imgPath);
};

export = {
	CheckFullImage,
};