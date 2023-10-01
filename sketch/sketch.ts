import ColorHelper from './ColorHelper';
import PolygonHelper from './PolygonHelper';

// GLOBAL VARS & TYPES
let numberOfShapesControl: p5.Element;

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
(window as any).setup = function setup() {
    console.log('🚀 - Setup initialized - P5 is running');

    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER).noFill().frameRate(30);
    // NUMBER OF SHAPES SLIDER
    numberOfShapesControl = createSlider(1, 30, 15, 1).position(10, 10).style('width', '100px');
};

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
(window as any).windowResized = function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
};

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
(window as any).draw = function draw() {
    // CLEAR BACKGROUND
    background(0);

    // CENTER OF SCREEN
    translate(width / 2, height / 2);

    const numberOfShapes = <number>numberOfShapesControl.value();
    const colours = ColorHelper.getColorsArray(numberOfShapes);

    // CONSISTENT SPEED REGARDLESS OF FRAMERATE
    const speed = (frameCount / (numberOfShapes * 30)) * 2;

    // DRAW ALL SHAPES
    for (var i = 0; i < numberOfShapes; i++) {
        push();
        const lineWidth = 8;
        const spin = speed * (numberOfShapes - i);
        const numberOfSides = 3 + i;
        const width = 40 * i;
        strokeWeight(lineWidth);
        stroke(colours[i]);
        rotate(spin);
        PolygonHelper.draw(numberOfSides, width);
        pop();
    }
};
