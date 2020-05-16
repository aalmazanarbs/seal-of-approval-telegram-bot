import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { TelegramBot } from 'nest-telegram';
import { SealOfApprovalTelegramBotModule } from './seal-of-approval-telegram-bot.module';
import { resolveAddress } from './network/address-resolver';

async function bootstrap() {
    const isProduction = process.env.NODE_ENV === 'production';

    const app = await NestFactory.create<NestFastifyApplication>(
        SealOfApprovalTelegramBotModule,
        new FastifyAdapter({ logger: true })
    );

    const bot = app.get(TelegramBot);

    if (isProduction) {
        app.use(bot.getMiddleware('hook-path', { source: process.env.BOT_CERTITICATE_PATH }));
    }

    const module = app.get(SealOfApprovalTelegramBotModule);

    bot.init(module.getModuleRef(), !isProduction);

    await app.listen(+process.env.APP_PORT || 3000, resolveAddress(isProduction));
}

bootstrap();
