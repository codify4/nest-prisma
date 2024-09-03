import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AuthPayloadDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    displayName?: string;
}