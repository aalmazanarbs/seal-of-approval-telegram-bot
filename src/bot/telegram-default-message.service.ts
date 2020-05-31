import { Injectable } from '@nestjs/common';
import { Context, TelegramActionHandler } from 'nest-telegram';
import { defaultMessageRegExp } from './messages-regex';

@Injectable()
export class TelegramDefaultMessageService {

    @TelegramActionHandler({ message: defaultMessageRegExp })
    async start(context: Context): Promise<void> {
        await context.reply('Bot monkeys don\'t know what to do with this message 🙊');
    }
}
