import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from '../schemas';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(data: User): Promise<User> {
    return this.userModel.create(data);
  }

  async findOne(query): Promise<User> {
    return this.userModel.findOne(query);
  }

  async findByAddress(address: string): Promise<User> {
    const user: User = await this.userModel.findOne({ address });
    if (!user) throw new NotFoundException();
    return user;
  }

  async findById(id: ObjectId): Promise<User> {
    const user: User = await this.userModel.findOne({ _id: id });
    if (!user) throw new NotFoundException();
    return user;
  }

  async updateOne(query, data) {
    return this.userModel.updateOne(query, { $set: { ...data } });
  }

  async deleteOne(_id: ObjectId) {
    return this.userModel.deleteOne({ _id });
  }
}
