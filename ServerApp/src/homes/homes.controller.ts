import { Controller, Post, Body, Get, Param, Patch, Req, Delete, UseGuards } from '@nestjs/common';
import {HomeService} from './home.service';
import { createHomeDto } from './createHomeDto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/auth/interfaces/user.interface';
@Controller('home')
export class HomesController {

    constructor(private homeService: HomeService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async addHome(@Body() createHomeDto: createHomeDto, @Req() req: any) {
        const user = <User>req.user;
        const home = await this.homeService.addHome(user, createHomeDto);
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
