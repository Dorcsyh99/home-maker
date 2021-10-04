import { Model } from 'mongoose';
import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Home, HomeDocument } from './home.model';
import { createHomeDto } from './createHomeDto';
import { User } from 'src/auth/interfaces/user.interface';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class HomeService {
	constructor(@InjectModel(Home.name) private homeModel: Model<HomeDocument>, private authService: AuthService) {}

	async addHome(email: string, createHomeDto: createHomeDto): Promise<Home> {
		console.log("Backend: ", createHomeDto);
		const uploader: User = await this.authService.getCurrentUser(email);
		const createdHome = new this.homeModel(createHomeDto);
		createdHome.uploader = uploader;

		return createdHome.save();
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
