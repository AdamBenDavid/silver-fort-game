import { Board, Shape, Color } from './types';
export declare function neighbors(r: number, c: number): [number, number][];
export declare function isValid(r: number, c: number, shape: Shape, color: Color, grid: Board): boolean;
export declare function anyValidForCell(r: number, c: number, grid: Board): boolean;
export declare function generateInitialBoard(): Board;
export declare function applyValidRandomChange(grid: Board, r: number, c: number): Board | null;
export declare function decrementCooldowns(grid: Board): Board;
