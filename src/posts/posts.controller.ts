import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';
import { CreateGroupPostDto } from './dtos/create-group-post.dto';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Post()
    createPost(@Body(ValidationPipe) {userId, ...createPostDto}: CreatePostDto) {
        return this.postsService.createPost(userId, createPostDto);
    }
    
    @Post('group')
    createGroupPost(@Body(ValidationPipe) {userIds, ...createGroupPostDto}: CreateGroupPostDto) {
        return this.postsService.createGroupPost(userIds, createGroupPostDto);
    }

    @Get('group')
    getGroupPosts() {
        return this.postsService.getGroupPosts();
    }
}
