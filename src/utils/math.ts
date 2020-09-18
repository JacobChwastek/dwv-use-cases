import { Point, Circle } from "./Models";

export const getCircleThrough3Point = (a: Point, b: Point, c: Point): Circle => {
    
    const x12 = a.x - b.x;
    const x13 = a.x - c.x;

    const y12 = a.y - b.y;
    const y13 = a.y - c.y;

    const y31 = c.y - a.y;
    const y21 = b.y - a.y;

    const x31 = c.x - a.x;
    const x21 = b.x - a.x;

    const sx13 = Math.pow(a.x, 2) - Math.pow(c.x, 2);
    const sy13 = Math.pow(a.y, 2) - Math.pow(c.y, 2);
    const sx21 = Math.pow(b.x, 2) - Math.pow(a.x, 2);
    const sy21 = Math.pow(b.y, 2) - Math.pow(a.y, 2);

    const f: number = ((sx13) * (x12)
        + (sy13) * (x12)
        + (sx21) * (x13)
        + (sy21) * (x13))
        / (2 * ((y31) * (x12) - (y21) * (x13)));
        
    const g: number = ((sx13) * (y12)
        + (sy13) * (y12)
        + (sx21) * (y13)
        + (sy21) * (y13))
        / (2 * ((x31) * (y12) - (x21) * (y13)));

    const cc = -Math.pow(a.x, 2) - Math.pow(a.y, 2) - 2 * g * a.x - 2 * f * a.y;

    const h: number = -1 * g;
    const k: number = -1 * f;
    const sqr_of_r = h * h + k * k - cc;

    const r = Math.sqrt(sqr_of_r);

    const center: Point = { x: h + 0, y: k + 0 };

    return { center, r }
}

export const average = (arr: Array<number>) => arr.reduce( ( p, c ) => p + c, 0 ) / (arr.length || 1);
