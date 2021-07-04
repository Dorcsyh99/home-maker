import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import {HomeService} from './home.service';
import { createHomeDto } from './createHomeDto';
@Controller('home')
export class HomesController {

    constructor(private homeService: HomeService) {}

    @Post('/create')
    async addHome(@Body() createHomeDto: createHomeDto) {
        const home = await this.homeService.addHome(createHomeDto);
        return home;
    }

    @Get()
    async findAll(){
        return this.homeService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: string) {
        return await this.homeService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() createHomeDto: createHomeDto){
        return await this.homeService.update(id, createHomeDto);
    }

    @Delete(':id')
    async delete(@Param('id') id:string) {
        return await this.homeService.delete(id);
    }
    
}
