import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';
import { CreateGroupPostDto } from './dtos/create-group-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Post()
    createPost(@Body(ValidationPipe) {userId, ...createPostDto}: CreatePostDto) {
        return this.postsService.createPost(userId, createPostDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('group')
    createGroupPost(@Body(ValidationPipe) {userIds, ...createGroupPostDto}: CreateGroupPostDto) {
        return this.postsService.createGroupPost(userIds, createGroupPostDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('group')
    getGroupPosts() {
        return this.postsService.getGroupPosts();
    }
}
