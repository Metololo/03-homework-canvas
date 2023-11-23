import * as drawlib from "../drawlib.js";
import * as color from "../color.js";

const TRUNK_COLOR = color.lightBrown;
const FOLIAGE_COLOR = color.darkGreen;

function makeTreeFoliage() {
    return drawlib.group([
        drawlib.move(-5,10,drawlib.circle(FOLIAGE_COLOR,60)),
        drawlib.move(-40,-5,drawlib.circle(FOLIAGE_COLOR,60)),
        drawlib.move(-80,-30,drawlib.circle(FOLIAGE_COLOR,60)),
        drawlib.move(-95,-80,drawlib.circle(FOLIAGE_COLOR,60)),
        drawlib.move(-50,-100,drawlib.circle(FOLIAGE_COLOR,60)),
        drawlib.move(-30,-100,drawlib.circle(FOLIAGE_COLOR,60)),
        drawlib.move(30,-70,drawlib.circle(FOLIAGE_COLOR,60)),
        drawlib.move(70,-30,drawlib.circle(FOLIAGE_COLOR,60)),
    ])
}

function makeTreeTrunk() {
    return drawlib.polygon(TRUNK_COLOR,[
        {x : -30,y : 0},
        {x : -60,y : 250},
        {x : 60,y : 250},
        {x : 30,y : 0},
    ]);
}

export function makeTree() {
    return drawlib.group([
        drawlib.move(0,0,makeTreeTrunk()),
        drawlib.move(0,0,makeTreeFoliage()),
    ])
}