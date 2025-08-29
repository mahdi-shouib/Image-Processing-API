import imageProcess from '../../util/imageProcess';

describe('Testing image processing functions', () => {

	describe('Test if files exist or not', () => {
		it('base image exists', async () => {
			expect(await imageProcess.CheckFullImage('icelandwaterfall.jpg')).toBe(true);
		});

		it('not a real image doesnt exist', async () => {
			expect(await imageProcess.CheckFullImage('notreal.file')).toBe(false);
		});
	});

	describe('Test cached images exist or not', () => {
		it('not real file is not cached', async () => {
			expect(await imageProcess.IsImageCached('notreal.file', 100, 100)).toBe(false);
		});

		it('cached image exists', async () => {
			await imageProcess.ResizeImage('palmtunnel.jpg', 500, 500);
			expect(await imageProcess.IsImageCached('palmtunnel.jpg', 500, 500)).toBe(true);
			await imageProcess.DeleteCachedImage('palmtunnel.jpg');
		});
	});
});
