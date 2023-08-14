import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { ObjectId } from 'mongoose';
import { UserRepository } from 'src/common/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUser(id: ObjectId): Promise<User> {
    return this.userRepository.findById(id);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }
}
