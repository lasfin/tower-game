export const gameStatuses = {
    initial: 'initial',
    paused: 'paused',
    inProgress: 'inProgress'
};

export const allTypes = ['square', 'triangle', 'circle'];

export const figuresTypes = {
    square: 'square',
    triangle: 'triangle',
    circle: 'circle'
};

export function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}