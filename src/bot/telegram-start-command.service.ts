import { Injectable } from '@nestjs/common';
import { Context, TelegramActionHandler, PipeContext } from 'nest-telegram';
import { TelegramUserContextTransformerService } from './telegram-user-context-transformer.service';
import { UsersService } from '../persistence/users.service';
import { User } from '../persistence/user';

@Injectable()
export class TelegramStartCommandService {

    private readonly adminUsersIds = new Set(this.parseEnvAdminUsers());

    constructor(private readonly usersService: UsersService) { }

    @TelegramActionHandler({ onStart: true })
    async start(context: Context, @PipeContext(TelegramUserContextTransformerService) user: User): Promise<void> {
        if (user) {
            await this.processRegisteredUser(context, user);
        } else {
            await this.processAnonymousUser(context);
        }
    }

    private parseEnvAdminUsers(): number[] {
        return process.env.ADMIN_USERS.split(',').map(adminUsersId => +adminUsersId);
    }

    private async processRegisteredUser(context: Context, user: User): Promise<void> {
        this.safeOrUpdateUser(user.userId, context.chat.id, this.adminUsersIds.has(user.userId));
        await context.reply('You are already registered 🙌');
    }

    private async processAnonymousUser(context: Context): Promise<void> {
        if (this.adminUsersIds.has(context.from.id)) {
            this.safeOrUpdateUser(context.from.id, context.chat.id, true);
            await context.reply('Welcome 👋');
        } else {
            const admins = await this.usersService.findAllAdmins();
            if (admins.length > 0) {
                const toAdminsRegisterRequestMessage = this.constructRegisterRequestMessage(context);
                // order is important because first reply will be send via webhook and second via http request
                const ramdonAdmin = admins[Math.floor(Math.random() * admins.length)];
                await context.reply('A request to register has been sent to administrators 🐒');
                await context.telegram.sendMessage(ramdonAdmin.chatId, toAdminsRegisterRequestMessage);
            } else {
                await context.reply('Administrators are not available now 😴');
            }
        }
    }

    private constructRegisterRequestMessage(context: Context): string {
        return `🤖 Hi administrator, user ${context.from.first_name} with user_id ${context.from.id} and chat_id ${context.chat.id} wants to register. Type /register user_id chat_id to allow it`;
    }

    private async safeOrUpdateUser(userId: number, chatId: number, isAdmin: boolean): Promise<void> {
        await this.usersService.save({ userId, chatId, isAdmin });
    }
}
