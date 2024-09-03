import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data: {
                ...data,
                userSetting: {
                    create: {
                        notificationsOn: false,
                        smsEnabled: true,
                    },
                },
            },
        })
    }

    async getUsers() {
        return this.prisma.user.findMany({ include: { userSetting: true } })
    }

    async getUserById(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
            include: { 
                userSetting: {
                    select: {
                        notificationsOn: true,
                        smsEnabled: true,
                    },
                }, 
                posts: true,
            },
        })
    }

    async getUserByUsername(username: string) {
        return this.prisma.user.findUnique({
            where: { 
                username 
            },
        })
    }

    async updateUserById(id: number, data: Prisma.UserUpdateInput) {
        const findUser = await this.getUserById(id);
        if(!findUser) throw new HttpException('User not found', 404);
        
        if(data.username) {
            const findUser = await this.prisma.user.findUnique({
                where: { username: data.username as string },
            });
            if(findUser) throw new HttpException('Username already taken', 400);
        }

        return this.prisma.user.update({ where: { id }, data })
    }

    async deleteUserById(id: number) {
        const findUser = await this.getUserById(id);
        if(!findUser) throw new HttpException('User not found', 404);

        return this.prisma.user.delete({ where: { id } })
    }

    async updateUserSettingsById(userId: number, data: Prisma.UserSettingUpdateInput) {
        const findUser = await this.getUserById(userId);
        if(!findUser) throw new HttpException('User not found', 404);
        if(!findUser.userSetting) throw new HttpException('Bad Request', 400);

        return this.prisma.userSetting.update({ where: { userId }, data })
    }
}
