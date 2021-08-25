import { Controller, Post, Body, Get, Param, Patch, Req, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/auth/interfaces/user.interface';
import { CurrentUser } from 'src/auth/decorators/currentuser.decorator';
import { SearchService } from './search.service';
import { Query } from 'mongoose';
import { Home } from 'src/homes/home.model';
@Controller('search')
export class SearchController {
    constructor(private searchService: SearchService) {}

    @Get(':city')
    async findByCity(@Param('city') city: string) : Promise<Home[]>{
        console.log("hello");
        return this.searchService.findByCity(city);
    }

    @Get('homes/featured')
    async getFeatured(): Promise<Home[]>{
        return this.searchService.featuredHomes();
    }
}