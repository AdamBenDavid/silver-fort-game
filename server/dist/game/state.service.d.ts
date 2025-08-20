import { Board } from './types';
export declare class StateService {
    private score;
    private board;
    constructor();
    getState(): {
        score: number;
        board: Board;
    };
    setBoard(b: Board): void;
    incScore(): void;
    reset(): void;
}
