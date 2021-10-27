import { UploadedFiles, UploadedFile, Controller, Post, Body, Get, Param, Response, Patch, Query, Req, Delete, UseGuards, UseInterceptors, Bind, StreamableFile } from '@nestjs/common';
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
import { createReadStream } from 'fs';


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
        FilesInterceptor('images[]', 999,
        {
            storage: diskStorage({
                destination: './images/homes',
                filename: (req, file, cb) => {
                  const filename: string = parse(file.originalname).name + uuidv1();
                  const extension: string = parse(file.originalname).ext;
                  
                  cb(null, `/${filename}${extension}`);
            }}),
        }))
    async addHome(@Req() req, @UploadedFiles() images: Array<any>, @Body() createHomeDto: createHomeDto) {
        console.log(images[0]);
        const email = req.user.email;
        const files: string[] = [];
        for(let i = 0; i < images.length; i++){
            files.push(images[i].filename);
        }
        console.log(files);
        const home = await this.homeService.addHome(email, createHomeDto, files);
        return home;
    }

    @Get('/images/:id')
    async getHomeImages(@Param('id') homeId: string, @Response({passthrough: true}) res): Promise<StreamableFile> {
        console.log("home: ", homeId);
        const path = process.cwd() + "\\images\homes\\" + homeId;
        console.log(path);
        const data = createReadStream(path);
        res.set({
            'Content-Type': 'image/jpg'
        })
        return new StreamableFile(data);
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
