import { HttpException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dtos/auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private jswService: JwtService,
        private userService: UsersService
    ) {}

    async validateUser({ username, password }: AuthPayloadDto) {
        const findUser = await this.userService.getUserByUsername(username);
        if(!findUser) return null;

        if(password !== findUser.password) {
            const { password, ...user } = findUser;
            return this.jswService.sign(user);
        }
    }

    async createUser(data: CreateUserDto) {
        const user = await this.userService.createUser(data);
    
        if (user.id) {
            throw new HttpException('User already exists', 400);
        }
    }
}
