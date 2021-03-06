import { Injectable } from '@nestjs/common';
import { Context, TelegramActionHandler, PipeContext } from 'nest-telegram';
import { TelegramUserContextTransformerService } from './telegram-user-context-transformer.service';
import { UsersService } from '../persistence/users.service';
import { User } from '../persistence/user';
import { registerCommandRegExp } from './messages-regex';

@Injectable()
export class TelegramRegisterCommandservice {

    constructor(private readonly usersService: UsersService) { }

    @TelegramActionHandler({ message: registerCommandRegExp })
    async start(context: Context, @PipeContext(TelegramUserContextTransformerService) user: User): Promise<void> {
        if (user?.isAdmin) {
            const persistedUser = await this.usersService.save(this.convertRegisterRequestToUser(context.message.text));
            await context.reply(`User ${persistedUser.userId} registered 🧐`);
            await context.telegram.sendMessage(persistedUser.chatId, `You can now get approvals sending valid urls 😏`);
        } else {
            await context.reply('You can not use register command ⛔');
        }
    }

    private convertRegisterRequestToUser(registerRequest: string): User {
        const { groups: { userId, chatId } } = registerCommandRegExp.exec(registerRequest);
        return { userId: +userId, chatId: +chatId, isAdmin: false};
    }
}
