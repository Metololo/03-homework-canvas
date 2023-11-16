import * as Color from "./color.js";

/**
 * @typedef { Color.Color} Color
 * 
 * The following type definition is meant to be "opaque".
 * That mean that users of `drawlib` will be able to use the `Shape` type
 * but are discouraged to build shapes directly as this representation
 * in terms of `Square/Circle/Group` might change in the future 
 * (and actually, it will! See the part 2 of the homework!)
 * 
 *
 * Users of the lib should build the shapes with helper functions such as
 * `square`, `circle` or `group`.
 *
 * @typedef {
   | {kind: "Circle";radius: number;color: Color; xCenter: number; yCenter: number}
   | {kind: "Group"; shapes : Array<Shape>}
   | { kind: "Polygon",color: Color;points: Array<{x: number; y:number}>}
   } Shape
  
   @typedef {
    {x: number,y: number}
   } Point
*/

/**
 * @param {number} x
 * @param {number} y
 * @returns {Point}
 */
function getPoint(x,y){
  return {x,y}
}


/**
 * @param {Color} color
 * @param {Array<{x:number; y:number}>} points
 * @returns {Shape}
 */
export function polygon(color, points) {
  return { kind:"Polygon", color: color, points: points };
}

/**
 * @param {Color} color
 * @param {number} width
 * @param {number} height
 * @returns {Shape}
 */
export function rectangle(color, width, height) {
  const center = {x: 0, y:0};

  const points = [];

  const halfWidth = width/2;
  const halfHeight = height/2;

  points[0] = getPoint(center.x - halfWidth,center.y - halfHeight);
  points[1] = getPoint(center.x + halfWidth,center.y - halfHeight);
  points[2] = getPoint(center.x + halfWidth,center.y + halfHeight);
  points[3] = getPoint(center.x - halfWidth,center.y + halfHeight);

  return polygon(color,points);
}

/**
 * @param {Color} color
 * @param {number} side
 * @returns {Shape}
 */
export function square(color, side) {
  return rectangle(color,side,side);
}

/**
 * @param {Color} color
 * @param {number} radius
 * @returns {Shape}
 */
export function circle(color, radius) {
  return { kind: "Circle", radius, color, xCenter: 0, yCenter: 0 };
}

/**
 * @param {Array<Shape>} shapes
 * @returns {Shape}
 */
export function group(shapes) {
  return { kind: "Group", shapes };
}
/**
 * This function move every coordinates in a polygon,
 * @param {number} dx
 * @param {number} dy
 * @param {Shape} shape
 * @returns {Shape}
 */
function movePolygon(dx,dy,shape) {
  if(shape.kind !== "Polygon") throw "Shape in movePolygon should be of kind Polygon";
  shape.points.forEach(coord => {
    coord.x += dx;
    coord.y += dy;
  });
  return shape;
}

/**
 * @param {number} dx
 * @param {number} dy
 * @param {Shape} shape
 * @returns {Shape}
 */
export function move(dx, dy, shape) {
  switch (shape.kind) {
    case "Circle":
      shape.xCenter += dx;
      shape.yCenter += dy;
      break;
    case "Group":
      shape.shapes.forEach(shape => move(dx,dy,shape));
      break;
    case "Polygon":
      shape = movePolygon(dx,dy,shape);
      break;
    default:
      throw "Unexpected! Some case is missing";
  }
  return shape;
}

/**
 * @param {CanvasRenderingContext2D} context
 * @param {Shape} shape
 * @returns {void}
 */
export function renderCentered(shape, context) {
  const width = context.canvas.width;
  const height = context.canvas.height;
  render(move(width / 2, height / 2, shape), context);
}


/**
 * @param {CanvasRenderingContext2D} context
 * @param {Shape} shape
 * @returns {void}
 */
function render(shape, context) {
  switch (shape.kind) {
    case "Circle":
      renderCircle(
        shape.color,
        shape.xCenter,
        shape.yCenter,
        shape.radius,
        context
      );
      break;
    case "Group":
      shape.shapes.forEach((shape) => render(shape, context));
      break;
    case "Polygon":
      renderPolygon(shape,context);
      break;
    default:
      throw "Unexpected! Some case is missing";
  }
}

/**
 * @param {Color} color
 * @param {number} radius
 * @param {number} xCenter
 * @param {number} yCenter
 * @param {CanvasRenderingContext2D} context
 */
function renderCircle(color, xCenter, yCenter, radius, context) {
  const circlePath = new Path2D();
  circlePath.ellipse(xCenter,yCenter,radius,radius,0,0,2 * Math.PI);
  context.fillStyle = Color.render(color);
  context.fill(circlePath);
}

/**
* @returns {Path2D}
* @param {Array<{x:number;y:number}>} points
*/
function polygonToPath(points) {

  const path = new Path2D();

  points.forEach((coord,index) => {
    if(index == 0) path.moveTo(coord.x,coord.y);
    else path.lineTo(coord.x,coord.y);
  });

  path.closePath();
  return path;

}


/**
 * @param {Shape} polygon
 * @param {CanvasRenderingContext2D} context
 */
function renderPolygon(polygon,context) {
  if(polygon.kind !== "Polygon") throw "renderPolygon only accept Shape of kind Polygon";

  const color = polygon.color;
  context.fillStyle = Color.render(color);
  context.fill(polygonToPath(polygon.points));
}

