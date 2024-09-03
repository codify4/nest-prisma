import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Prisma } from "@prisma/client";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate({username, password}: Prisma.UserCreateInput) {
        const user = this.authService.validateUser({ username, password });
        if(!user) throw new UnauthorizedException();
        return user;
    }
}