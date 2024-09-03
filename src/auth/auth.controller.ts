import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Req() req: Request) {
        return req.user;
    }
}
