import * as drawlib from "../drawlib.js";
import * as color from "../color.js";

// Sheep associated colors

const BODY_COLOR = color.grey;
const WOOL_COLOR = color.charcoal

function makeSheepEye() {
    return drawlib.circle(color.black, 7);
}

function makeHeadWool() {
    return drawlib.group([
        drawlib.circle(color.charcoal, 20),
        drawlib.move(-4, 10, drawlib.circle(WOOL_COLOR, 20)),
        drawlib.move(-20, 3, drawlib.circle(WOOL_COLOR, 20)),
        drawlib.move(18, 5, drawlib.circle(WOOL_COLOR, 20)),
    ])
}

function makeHead() {
    return drawlib.group([
        drawlib.polygon(BODY_COLOR, [
            { x: 0, y: 0 },
            { x: -40, y: 10 },
            { x: -50, y: 30 },
            { x: -40, y: 100 },
            { x: 0, y: 120 },
            { x: 40, y: 100 },
            { x: 50, y: 30 },
            { x: 40, y: 10 },
        ]),
        drawlib.move(-20, 40, makeSheepEye(),),
        drawlib.move(20, 40, makeSheepEye(),),
        drawlib.move(-3, 100, drawlib.polygon(color.black, [
            { x: 0, y: 0 },
            { x: 0, y: 18 },
            { x: 7, y: 18 },
            { x: 7, y: 0 },
        ])),
        drawlib.move(-20, 100, drawlib.polygon(color.black, [
            { x: 0, y: 0 },
            { x: 18, y: 7 },
            { x: 18, y: 0 },
            { x: 0, y: -7 },
        ])),
        drawlib.move(3, 100, drawlib.polygon(color.black, [
            { x: 0, y: 7 },
            { x: 18, y: 0 },
            { x: 18, y: -7 },
            { x: 0, y: 0 },
        ])),
        drawlib.move(40, 20, drawlib.polygon(color.black, [
            { x: 0, y: 0 },
            { x: 18, y: 6 },
            { x: 36, y: 24 },
            { x: 36, y: 36 },
            { x: 24, y: 36 },
            { x: 6, y: 18 },
        ])),
        drawlib.move(-40, 20, drawlib.polygon(color.black, [
            { x: 0, y: 0 },
            { x: -18, y: 6 },
            { x: -36, y: 24 },
            { x: -36, y: 36 },
            { x: -24, y: 36 },
            { x: -6, y: 18 },
        ])),
        drawlib.move(0, -7, makeHeadWool())
    ])
}


function makeBody() {
    return drawlib.group([
        drawlib.move(20, 0, drawlib.circle(WOOL_COLOR, 80)),
        drawlib.move(80, -10, drawlib.circle(WOOL_COLOR, 80)),
        drawlib.move(140, 0, drawlib.circle(WOOL_COLOR, 80)),
        drawlib.move(30, 35, drawlib.circle(WOOL_COLOR, 80)),
        drawlib.move(80, 50, drawlib.circle(WOOL_COLOR, 80)),
        drawlib.move(130, 40, drawlib.circle(WOOL_COLOR, 80)),
    ]);
}

function makeFeet() {
    return drawlib.group([
        drawlib.rectangle(BODY_COLOR, 20, 120),
        drawlib.move(0, 50, drawlib.rectangle(color.black, 20, 20)),
    ])
}

export function makeSheep() {
    return drawlib.group([
        drawlib.move(25, 160, makeFeet()),
        drawlib.move(165, 160, makeFeet()),

        drawlib.move(40, 45, makeBody()),
        drawlib.move(0, -50, makeHead()),

        drawlib.move(195, 160, makeFeet()),
        drawlib.move(50, 160, makeFeet()),
    ])
}
