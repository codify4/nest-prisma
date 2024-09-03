import { IsBoolean, IsOptional } from "class-validator";

export class UpdateUserSettingsDto {
    @IsBoolean()
    @IsOptional()
    notificationsOn?: boolean;

    @IsBoolean()
    @IsOptional()
    smsEnabled?: boolean;
}