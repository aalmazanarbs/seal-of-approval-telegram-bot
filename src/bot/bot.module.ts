import { Module } from '@nestjs/common';
import { TelegramModule } from 'nest-telegram';
import { TelegramBotModuleOptionsFactory } from './telegram-bot-module-options-factory';
import { TelegramApproveMessageService } from './telegram-approve-message.service';
import { TelegramRegisterMessageService } from './telegram-register-command.service';
import { TelegramStartCommandService } from './telegram-start-command.service';
import { TelegramUserContextTransformerService } from './telegram-user-context-transformer.service';
import { TelegramDefaultMessageService } from './telegram-default-message.service';

@Module({
    imports: [
        TelegramModule.fromFactory({ useClass: TelegramBotModuleOptionsFactory })
    ],
    providers: [
        TelegramApproveMessageService,
        TelegramDefaultMessageService,
        TelegramRegisterMessageService,
        TelegramStartCommandService,
        TelegramUserContextTransformerService
    ]
})
export class BotModule { }
