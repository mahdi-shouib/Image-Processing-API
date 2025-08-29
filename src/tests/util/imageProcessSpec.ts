import imageProcess from "../../util/imageProcess";

describe('Testing image processing functions', () => {

    describe('Test if files exist or not', () => {
        
        it('base image exists', () => {
            expect(imageProcess.CheckFullImage('icelandwaterfall.jpg')).toBe(true);
        });

        it('not a real image doesnt exist', () => {
            expect(imageProcess.CheckFullImage('notreal.file')).toBe(false);
        });
    });
})