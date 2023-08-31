import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsersEntity) private userRepo: Repository<UsersEntity>
    ) { }

    async fetchUsers() {
        try {
            // try {
            //     // await this.apiService.fetch('get', {});
            // } catch (err) {
            //     console.log(err);
            // }
            return await this.userRepo.find({});
        } catch (err) {
            console.log(err);
        }
    }

    async createUser(body: CreateUserDto) {
        return await this.userRepo.save(body);
    }

}