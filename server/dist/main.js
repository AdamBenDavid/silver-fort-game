"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const env_1 = require("./config/env");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: { origin: env_1.env.CORS_ORIGIN },
        logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    });
    await app.listen(env_1.env.PORT);
    console.log(`Nest server running on http://localhost:${env_1.env.PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map