import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Home, HomeDocument } from './home.model';
import { createHomeDto } from './createHomeDto';
import { User } from 'src/auth/interfaces/user.interface';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class HomeService {
	constructor(@InjectModel(Home.name) private homeModel: Model<HomeDocument>, private authService: AuthService) {}

	async addHome({ email }: User, createHomeDto: createHomeDto): Promise<Home> {
		const uploader = await this.authService.getCurrentUser(email);
		const createdHome = new this.homeModel(createHomeDto);
		createdHome.uploader = uploader;

		return createdHome.save();
	}

	async findAll(): Promise<Home[]> {
		return this.homeModel.find().exec();
	}

	async findOne(id: string): Promise<Home> {
		return await this.homeModel.findById(id).exec();
	}

	async update(id: string, createHomeDto: createHomeDto): Promise<Home> {
		return await this.homeModel.findByIdAndUpdate(id, createHomeDto).exec();
	}

	async delete(id: string): Promise<Home> {
		return await this.homeModel.findByIdAndDelete(id).exec();
	}

}
