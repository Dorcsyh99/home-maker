import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Home, HomeDocument } from './home.model';
import { createHomeDto } from './createHomeDto';

@Injectable()
export class HomeService {
	constructor(@InjectModel(Home.name) private homeModel: Model<HomeDocument>) {}

	async addHome(createHomeDto: createHomeDto): Promise<Home> {
		const createdHome = new this.homeModel(createHomeDto);
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
