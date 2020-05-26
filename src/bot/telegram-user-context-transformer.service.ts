import { Injectable } from '@nestjs/common'
import { ContextTransformer, Context } from 'nest-telegram'
import { User } from '../persistence/user';
import { UsersService } from '../persistence/users.service';

@Injectable()
export class TelegramUserContextTransformerService implements ContextTransformer<User> {

    constructor(private readonly usersService: UsersService) { }

    async transform(context: Context): Promise<User> {
        return await this.usersService.findById(context.from.id);
    }
}
