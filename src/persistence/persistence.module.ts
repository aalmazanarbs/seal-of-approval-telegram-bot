import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: process.env.MONGODB_HOST,
            port: +process.env.MONGODB_PORT ?? 27017,
            database: 'seal-of-approval-telegram-bot',
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoLoadEntities: true,
            synchronize: true
        }),
        TypeOrmModule.forFeature([User])
    ],
    providers: [UsersService],
    exports: [UsersService]
})
export class PersistenceModule { }
