import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }

    public save(user: User): Promise<User> {
        return this.findById(user.userId)
                   .then(persistedUser => this.usersRepository.save({...persistedUser, ...user}));
    }

    public findById(userId: number): Promise<User> {
        return this.usersRepository.findOne({ where: { userId } });
    }

    public findAllAdmins(): Promise<User[]> {
        return this.usersRepository.find({ where: { isAdmin: true } });
    }
}
