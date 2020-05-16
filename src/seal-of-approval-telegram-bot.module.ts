import { Module } from '@nestjs/common';
import { TelegramModule } from 'nest-telegram';
import { SealOfApprovalBotTelegramModuleOptionsFactory } from './telegram/seal-of-approval-bot-telegram-module-options-factory';
import { ModuleRef } from '@nestjs/core';
import { HelpActions } from './telegram/HelpActions';

@Module({
    imports: [
        TelegramModule.fromFactory({ useClass: SealOfApprovalBotTelegramModuleOptionsFactory })
    ],
    providers: [HelpActions]
})
export class SealOfApprovalTelegramBotModule {

    constructor(private readonly moduleRef: ModuleRef) { }

    public getModuleRef(): ModuleRef {
        return this.moduleRef;
    }
}
