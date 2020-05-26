import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class User {

    @ObjectIdColumn() id?: ObjectID;
    @Column({ unique: true }) userId: number;
    @Column() chatId: number;
    @Column() isAdmin: boolean;
}
