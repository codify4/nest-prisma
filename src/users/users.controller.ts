import { Body, Controller, Get, HttpException, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        const user = await this.usersService.getUserById(id);
        if(!user) throw new HttpException('User not found', 404);
        return user;
    }
}
