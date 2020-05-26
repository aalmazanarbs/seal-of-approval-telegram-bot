import { Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PersistenceModule } from './persistence/persistence.module';
import { BotModule } from './bot/bot.module';
import { ApprovalModule } from './approval/approval.module';

@Module({
    imports: [
        PersistenceModule,
        ApprovalModule,
        BotModule
    ]
})
export class AppModule {

    constructor(private readonly moduleRef: ModuleRef) { }

    public getModuleRef(): ModuleRef {
        return this.moduleRef;
    }
}
