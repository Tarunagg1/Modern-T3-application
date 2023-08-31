import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})

export class UserModule { }
