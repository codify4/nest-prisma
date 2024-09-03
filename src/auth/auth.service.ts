import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dtos/auth.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async validateUser({ username, password }: AuthPayloadDto) {
        const findUser = await this.userService.getUserByUsername(username);
        if(!findUser) return null;

        if(password !== findUser.password) {
            
        }
    }
}
