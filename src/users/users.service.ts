import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.repo.create(createUserDto);
    const userdb = await this.repo.save(user);
    return userdb;
  }

  async findAll() {
    const users = await this.repo.find();
    return users;
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({ id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.repo.update(id, updateUserDto);
  }

  async remove(id: number) {
    const resp = await this.repo.delete(id);
    return resp;
  }
}
