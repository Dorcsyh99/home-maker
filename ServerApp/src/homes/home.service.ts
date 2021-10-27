import { Model } from 'mongoose';
import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Home, HomeDocument } from './home.model';
import { createHomeDto } from './createHomeDto';
import { User } from 'src/auth/interfaces/user.interface';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { parse } from 'path';

@Injectable()
export class HomeService {
	constructor(@InjectModel(Home.name) private homeModel: Model<HomeDocument>, private authService: AuthService) {}

	async addHome(email: string, createHomeDto: createHomeDto, fileNames: string[]): Promise<void> {
		console.log("Backend: ", createHomeDto);
		const uploader: User = await this.authService.getCurrentUser(email);
		const createdHome = await new this.homeModel(createHomeDto);
		
		try {
			await this.authService.updateProfile(uploader.id, {uploadedHomes: createdHome.id});
			createdHome.uploader = uploader;
			fileNames.forEach(name => {
				createdHome.images.push(name);
			})
			createdHome.save();
		}catch(err){
			throw(err);
		} 
	}

	async findAll(limit?: number) {
		const query = this.homeModel.find();
		const results = await query.limit(limit);
		return results;
	}

	async findOne(id: string): Promise<Home> {
		return await this.homeModel.findById(id).exec();
	}

	//async update(id: string, createHomeDto: createHomeDto): Promise<Home> {
	//	return await this.homeModel.findByIdAndUpdate(id, createHomeDto).exec();
	//}

	async delete(id: string): Promise<Home> {
		return await this.homeModel.findByIdAndDelete(id).exec();
	}

}
