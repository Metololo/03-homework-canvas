import * as drawlib from "./drawlib.js";
import * as color from "./color.js";
import { makeSheep } from "./draws/sheep.js"
import { makeTree } from "./draws/tree.js";

/**
 * @throws {string}
 * @returns {CanvasRenderingContext2D}
 * @param {string} id
 */
function get2DContextById(id) {
    const canvas = document.getElementById(id);
    if (canvas === null) {
      throw "No html element with id `canvas` found";
    }
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw "The selected element is not a canvas";
    }
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        return ctx;
      } else {
        throw "Error when getting the context";
      }
    } else {
      throw "`getContext` is not a property of the element. Please use a modern browser.";
    }
  }


  const sheepGroup = drawlib.group([
    drawlib.move(-100,0,makeSheep()),
    drawlib.move(280,70,makeSheep()),
  ]);

  const grass = drawlib.polygon(color.green,[
    {x : -1000,y : -10},
    {x : 1000,y : 70 },
    {x : 1000,y : 500 },
    {x : -1000,y : 500 },
  ]);

  const scene = drawlib.group([
    grass,
    drawlib.move(50,-120,makeTree()),
    drawlib.move(-400,-40,makeTree()),
    drawlib.move(500,-20,makeTree()),
    sheepGroup,
  ]);
  
  function main() {
    const context = get2DContextById("canvas");
    drawlib.renderCentered(scene, context);
  }
  main();


