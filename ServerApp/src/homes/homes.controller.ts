import { UploadedFiles, UploadedFile, Controller, Post, Body, Get, Param, Patch, Query, Req, Delete, UseGuards, UseInterceptors, Bind } from '@nestjs/common';
import {HomeService} from './home.service';
import { createHomeDto } from './createHomeDto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/auth/interfaces/user.interface';
import { CurrentUser } from 'src/auth/decorators/currentuser.decorator';
import { AuthService } from 'src/auth/auth.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express/multer';
import {diskStorage} from 'multer';
import path, { join, parse } from 'path';
import {v1 as uuidv1} from 'uuid';

const imageFilter = (req, file, callback) => {
    let ext = path.extname(file.originalname);
    if(ext === '.png' || ext === '.jpeg' || ext === '.jpg'){
        return callback(null, true);
    }else{
        return callback(new Error('Invalid file type'), false);
    }
}

@Controller('home')
export class HomesController {

    constructor(private homeService: HomeService, private authService: AuthService) {}

    @Post('/create')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FilesInterceptor('image', 10,
        {
            storage: diskStorage({
                destination: './images/homes',
                filename: (req, file, cb) => {
                  const filename: string = parse(file.originalname).name + uuidv1();
                  const extension: string = parse(file.originalname).ext;
                  
                  cb(null, `/${filename}${extension}`);
            }}),
        }))
    async addHome(@Req() req, @UploadedFiles() image, @Body() createHomeDto: createHomeDto) {
        console.log(createHomeDto.image[0].name);
        const email = req.user.email;
        const files: string[] = [];
        for(let i = 0; i < createHomeDto.image.length; i++){
            files.push(createHomeDto[i].name);
        }
        console.log(files);
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
