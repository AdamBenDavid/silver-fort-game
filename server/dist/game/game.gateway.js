"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var GameGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const state_service_1 = require("./state.service");
const board_1 = require("./board");
const common_1 = require("@nestjs/common");
let GameGateway = GameGateway_1 = class GameGateway {
    state;
    server;
    logger = new common_1.Logger(GameGateway_1.name);
    constructor(state) {
        this.state = state;
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
        this.server.emit('init', this.state.getState());
    }
    handleClick({ row, col }) {
        this.logger.debug(`Click received on cell [${row}, ${col}]`);
        const { board, score } = this.state.getState();
        const cell = board[row]?.[col];
        if (!cell || cell.cooldown > 0)
            return;
        if (!(0, board_1.anyValidForCell)(row, col, board)) {
            this.server.emit('gameOver', { board, score });
            return;
        }
        const updated = (0, board_1.applyValidRandomChange)(board, row, col);
        if (!updated) {
            this.server.emit('gameOver', { board, score });
            return;
        }
        const cooled = (0, board_1.decrementCooldowns)(updated);
        this.state.setBoard(cooled);
        this.state.incScore();
        this.server.emit('update', this.state.getState());
    }
    handleReset() {
        this.logger.warn('Game reset requested');
        this.state.reset();
        this.server.emit('init', this.state.getState());
    }
};
exports.GameGateway = GameGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GameGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('clickCell'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleClick", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('reset'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleReset", null);
exports.GameGateway = GameGateway = GameGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' } }),
    __metadata("design:paramtypes", [state_service_1.StateService])
], GameGateway);
//# sourceMappingURL=game.gateway.js.map