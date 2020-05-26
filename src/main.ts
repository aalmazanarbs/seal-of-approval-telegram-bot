import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { TelegramBot } from 'nest-telegram';
import { AppModule } from './app.module';
import { resolveAddress } from './network/address-resolver';

async function bootstrap() {
    const isProduction = process.env.NODE_ENV === 'production';

    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true })
    );

    const bot = app.get(TelegramBot);

    if (isProduction) {
        const secretPath = process.env.BOT_SECRET_WEBHOOK_PATH;
        if (secretPath === undefined || secretPath === null || secretPath === '') {
            throw new Error('Not set environment variable BOT_SECRET_WEBHOOK_PATH');
        }
        app.use(bot.getMiddleware(secretPath, { source: process.env.BOT_CERTITICATE_PATH }));
    }

    const module = app.get(AppModule);

    bot.init(module.getModuleRef(), !isProduction);

    await app.listen(+process.env.APP_PORT ?? 3000, resolveAddress(isProduction));
}

bootstrap();
