import { TelegramModuleOptionsFactory, TelegramModuleOptions } from 'nest-telegram';

export class TelegramBotModuleOptionsFactory implements TelegramModuleOptionsFactory {
    
    createOptions(): TelegramModuleOptions {
        return {
            token: process.env.BOT_TOKEN,
            sitePublicUrl: process.env.HOST,
        };
    }
}
