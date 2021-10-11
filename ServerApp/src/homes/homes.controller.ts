import { Controller, Post, Body, Get, Param, Patch, Query, Req, Delete, UseGuards } from '@nestjs/common';
import {HomeService} from './home.service';
import { createHomeDto } from './createHomeDto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/auth/interfaces/user.interface';
import { CurrentUser } from 'src/auth/decorators/currentuser.decorator';
import { AuthService } from 'src/auth/auth.service';

@Controller('home')
export class HomesController {

    constructor(private homeService: HomeService, private authService: AuthService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async addHome(@Req() req, @Body() createHomeDto: createHomeDto) {
        const email = req.user.email;
        console.log("home controller: ", createHomeDto);
        const home = await this.homeService.addHome(email, createHomeDto);
        return home;
    }

    @Get("/all")
    async findAll(){
        return this.homeService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: string) {
        return await this.homeService.findOne(id);
    }

    /*@Patch(':id')
    async update(@Param('id') id: string, @Body() createHomeDto: createHomeDto){
        return await this.homeService.update(id, createHomeDto);
    }*/

    @Delete(':id')
    async delete(@Param('id') id:string) {
        return await this.homeService.delete(id);
    }
    
}
