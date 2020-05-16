import { TelegramModuleOptionsFactory, TelegramModuleOptions } from 'nest-telegram';

export class SealOfApprovalBotTelegramModuleOptionsFactory implements TelegramModuleOptionsFactory {
    
    createOptions(): TelegramModuleOptions {
        return {
            token: process.env.BOT_TOKEN,
            sitePublicUrl: process.env.HOST,
        };
    }
}
