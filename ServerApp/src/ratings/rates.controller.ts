import { Controller, Post, Body, Get, Param, Patch, Req, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddRatingDto } from './dto/add-rating.dto';
import { RateService } from './rates.service';

@Controller('rate')
export class RateController {

    constructor(private rateService: RateService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addRating(@Body() addRateDto: AddRatingDto, @Req() req: any){
        const user = req.user;
        const id = addRateDto.expertId;

        return await this.rateService.createRating(addRateDto, user._id, id);

    }
}