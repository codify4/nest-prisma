import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
    ) {}
    async validateUser({ username, password }: Prisma.UserCreateInput) {
        const findUser = await this.userService.getUserByUsername(username);

        if(!findUser) return null;

        if(password === findUser.password) {
            const { password, ...user } = findUser;
            return this.jwtService.sign(user);
        }
    }
}
