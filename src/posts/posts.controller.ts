import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Post()
    createPost(@Body(ValidationPipe) {userId, ...createPostDto}: CreatePostDto) {
        return this.postsService.createPost(userId, createPostDto);
    }   
}
