import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards, UsePipes, ValidationPipe, } from '@nestjs/common';

import {
    ApiBearerAuth,
    ApiConsumes,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UsersEntity } from './user.entity';
import { CrateUserResponseDto, CreateUserDto } from './user.dto';


@Controller('users')
@ApiBearerAuth('authorization')
@ApiTags('users')
@UsePipes(
    new ValidationPipe({
        whitelist: true,
        transform: true,
    }),
)
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    //@RoleAllowed('admin', 'user')
    @HttpCode(HttpStatus.OK)
    // @ApiOkResponse({
    //     type: [CrateUserResponseDto],
    //     description: 'user fetched successfully',
    // })
    @ApiOperation({ description: 'user fetch api ' })
    @ApiConsumes('application/json')
    @Get()
    async findAll(user: any): Promise<UsersEntity[]> {
        return await this.userService.fetchUsers();
    }



    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
      type: CrateUserResponseDto,
      description: 'user created successfully',
    })
    @ApiOperation({ description: 'user create api ' })
    @ApiConsumes('application/json')
    @Post()
    async create(@Body() body: CreateUserDto): Promise<UsersEntity> {
      return await this.userService.createUser(body);
    }
}