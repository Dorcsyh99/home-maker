import { Controller, Post, Body, Get, Param, Patch, Req, Delete, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/auth/interfaces/user.interface';
import { CurrentUser } from 'src/auth/decorators/currentuser.decorator';
import { SearchService } from './search.service';
import { Home } from 'src/homes/home.model';
import { HomeQuery, MainPageFormData } from './search.data.dto';
@Controller('search')
export class SearchController {
    constructor(private searchService: SearchService) {}

    @Get(':city')
    async findByCity(@Param('city') city: string) : Promise<Home[]>{
        return this.searchService.findByCity(city);
    }

    @Get('homes/featured')
    async getFeatured(): Promise<Home[]>{
        return this.searchService.featuredHomes();
    }

    @Get('homes/query')
    async findByQuery(@Query() queryDto: MainPageFormData): Promise<Home[]>{
        console.log("belepett ide, query: ", queryDto);
        return this.searchService.findByQuery(queryDto);
    }
    @Get(':id/homes')
    async findHomesByUploader(@Param('id') id: string): Promise<Home[]> {
        return this.searchService.findHomesByUploader(id);
    }
}
