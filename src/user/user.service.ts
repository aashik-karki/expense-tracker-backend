import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';
import {
  FindManyOptions,
  FindOneWhereOptions,
  FindRelationsOptions,
} from 'src/repository/type-def';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const password = createUserDto.password;
    const hashPassword = await bcrypt.hash(password, 10);
    console.log('this is hash password', hashPassword, this.userRepository);
    const user = { ...createUserDto, password: hashPassword };
    return await this.userRepository.save(user);
  }

  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  // async updateUser(id: number, updateUserDto: UpdateUserDto){
  //   return await this.userRepository.update(id, updateUserDto);
  // }

  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }

  public async findMany(
    where?: FindOneWhereOptions<User>,
    relations?: FindRelationsOptions<User>,
    findManyOptions?: FindManyOptions<User>,
  ): Promise<User[]> {
    const skip = findManyOptions?.skip ?? 0;
    const take = findManyOptions?.take ?? 10;

    return await this.userRepository.find({
      where,
      relations,
      skip,
      take,
    });
  }

  public async findOne(
    where: FindOneWhereOptions<User>,
    relations?: FindRelationsOptions<User>,
  ): Promise<User> {
    return await this.userRepository.findOne({
      where,
      relations,
    });
  }

  public async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email: ILike(email) });
  }
}
