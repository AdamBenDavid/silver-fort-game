"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.neighbors = neighbors;
exports.isValid = isValid;
exports.anyValidForCell = anyValidForCell;
exports.generateInitialBoard = generateInitialBoard;
exports.applyValidRandomChange = applyValidRandomChange;
exports.decrementCooldowns = decrementCooldowns;
const types_1 = require("./types");
const constants_1 = require("./constants");
function neighbors(r, c) {
    return [
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1],
    ].filter(([rr, cc]) => rr >= 0 && rr < constants_1.ROWS && cc >= 0 && cc < constants_1.COLS);
}
function isValid(r, c, shape, color, grid) {
    for (const [rr, cc] of neighbors(r, c)) {
        const n = grid[rr]?.[cc];
        if (!n)
            continue;
        if (n.shape === shape)
            return false;
        if (n.color === color)
            return false;
    }
    return true;
}
function anyValidForCell(r, c, grid) {
    for (const s of types_1.SHAPES)
        for (const col of types_1.COLORS) {
            if (isValid(r, c, s, col, grid))
                return true;
        }
    return false;
}
function randomOf(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function generateInitialBoard() {
    const g = Array.from({ length: constants_1.ROWS }, () => Array(constants_1.COLS).fill(null));
    for (let r = 0; r < constants_1.ROWS; r++) {
        for (let c = 0; c < constants_1.COLS; c++) {
            let tries = constants_1.MAX_TRIES;
            let chosen = null;
            while (tries--) {
                const s = randomOf(types_1.SHAPES);
                const col = randomOf(types_1.COLORS);
                if (isValid(r, c, s, col, g)) {
                    chosen = { shape: s, color: col };
                    break;
                }
            }
            if (!chosen)
                return generateInitialBoard();
            g[r][c] = { shape: chosen.shape, color: chosen.color, cooldown: 0 };
        }
    }
    return g;
}
function applyValidRandomChange(grid, r, c) {
    let tries = constants_1.MAX_TRIES;
    while (tries--) {
        const s = randomOf(types_1.SHAPES);
        const col = randomOf(types_1.COLORS);
        if (isValid(r, c, s, col, grid)) {
            const next = grid.map((row) => row.map((cell) => ({ ...cell })));
            next[r][c] = { shape: s, color: col, cooldown: constants_1.INITIAL_COOLDOWN };
            return next;
        }
    }
    return null;
}
function decrementCooldowns(grid) {
    const next = grid.map((row) => row.map((cell) => ({ ...cell })));
    for (let r = 0; r < constants_1.ROWS; r++) {
        for (let c = 0; c < constants_1.COLS; c++) {
            const cell = next[r][c];
            if (cell.cooldown > 0)
                cell.cooldown--;
        }
    }
    return next;
}
//# sourceMappingURL=board.js.map