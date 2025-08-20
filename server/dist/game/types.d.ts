export declare const SHAPES: readonly ["triangle", "square", "diamond", "circle"];
export declare const COLORS: readonly ["red", "green", "blue", "yellow"];
export type Shape = (typeof SHAPES)[number];
export type Color = (typeof COLORS)[number];
export type Cell = {
    shape: Shape;
    color: Color;
    cooldown: number;
};
export type Board = Cell[][];
