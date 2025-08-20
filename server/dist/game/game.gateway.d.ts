import { OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { StateService } from './state.service';
export declare class GameGateway implements OnGatewayConnection {
    private readonly state;
    server: Server;
    private readonly logger;
    constructor(state: StateService);
    handleConnection(client: any): void;
    handleClick({ row, col }: {
        row: number;
        col: number;
    }): void;
    handleReset(): void;
}
