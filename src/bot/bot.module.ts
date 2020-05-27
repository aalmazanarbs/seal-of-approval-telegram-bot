import { Module } from '@nestjs/common';
import { TelegramModule } from 'nest-telegram';
import { TelegramBotModuleOptionsFactory } from './telegram-bot-module-options-factory';
import { TelegramApproveMessageService } from './telegram-approve-message.service';
import { TelegramDefaultMessageService } from './telegram-default-message.service';
import { TelegramRegisterCommandservice } from './telegram-register-command.service';
import { TelegramStartCommandService } from './telegram-start-command.service';
import { TelegramUserContextTransformerService } from './telegram-user-context-transformer.service';

@Module({
    imports: [
        TelegramModule.fromFactory({ useClass: TelegramBotModuleOptionsFactory })
    ],
    providers: [
        TelegramApproveMessageService,
        TelegramDefaultMessageService,
        TelegramRegisterCommandservice,
        TelegramStartCommandService,
        TelegramUserContextTransformerService
    ]
})
export class BotModule { }
