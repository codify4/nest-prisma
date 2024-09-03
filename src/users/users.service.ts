import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data })
    }

    async getUsers() {
        return this.prisma.user.findMany()
    }

    async getUserById(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
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
}
