import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    async createPost(userId: number, data: Prisma.PostCreateWithoutUserInput) {
        return this.prisma.post.create({ data: {
            ...data,
            userId,
        } })
    }
}
