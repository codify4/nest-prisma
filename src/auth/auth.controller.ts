import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalGuard)
    @Post('login')
    login(@Req() req: Request) {
        return req.user
    }
}
