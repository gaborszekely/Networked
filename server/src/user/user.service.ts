import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { LoginUser } from './interfaces/login-user.interface';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<any>) {}

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async find(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, updatedBody: any): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updatedBody, {
      new: true,
    });
  }
}
