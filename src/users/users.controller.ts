import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdateUserSettingsDto } from './dtos/update-settings.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        const user = await this.usersService.getUserById(id);
        if(!user) throw new HttpException('User not found', 404);
        return user;
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateUserById(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.updateUserById(id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUserById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/settings')
    updateUserSettingsById(
        @Param('id', ParseIntPipe) id: number, 
        @Body(ValidationPipe) updateUserSettingsDto: UpdateUserSettingsDto
    ) {
        return this.usersService.updateUserSettingsById(id, updateUserSettingsDto);
    }
}