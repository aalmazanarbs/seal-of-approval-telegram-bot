import { Injectable } from '@nestjs/common';
import { Context, TelegramActionHandler } from 'nest-telegram';

@Injectable()
export class HelpActions {

    @TelegramActionHandler({ onStart: true })
    async start(ctx: Context) {
        await ctx.reply('Hello!');
    }
}
