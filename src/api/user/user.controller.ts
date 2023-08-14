import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationMongoIdPipe } from 'src/common/pipes';
import { ObjectId } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/:id')
  getUser(@Param('id', ValidationMongoIdPipe) id: ObjectId): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post('')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
}
