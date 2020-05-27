import { Injectable } from '@nestjs/common';
import { Context, TelegramActionHandler } from 'nest-telegram';
import { defaultMessageRegx } from './constants';

@Injectable()
export class TelegramDefaultMessageService {

    @TelegramActionHandler({ message: defaultMessageRegx })
    async start(context: Context): Promise<void> {
        await context.reply('Bot monkeys don\'t know what to do with this message 🙊');
    }
}
