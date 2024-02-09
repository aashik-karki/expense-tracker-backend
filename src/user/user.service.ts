import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, DataSource, IsNull } from 'typeorm';
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

  async createUser(createUserDto: CreateUserDto) {
    const emailAlreadyExsit = await this.checkIfEmailAlreadyExists(
      createUserDto.email,
    );
    if (emailAlreadyExsit) {
      return { message: 'Email already Exist', statuscode: 409 };
    }

    const password = createUserDto.password;

    const hashPassword = await bcrypt.hash(password, 10);
    const user = { ...createUserDto, password: hashPassword };
    await this.userRepository.save(user);
    return { message: 'you have register successfully' };
  }

  findAllUser() {
    return this.userRepository.find();
  }

  async findUserById(id: number) {
    const userById = await this.userRepository.findOneBy({ id });

    if (userById === null) {
      return { message: 'user doesnt exist' };
    }
    const { id: Id, name, username, email, role } = userById;
    return { Id, name, username, email, role };
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async DeleteUser(id: number) {
    const deleteItmes = await this.userRepository.delete(id);
    console.log('this is a DeletUser', deleteItmes);
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

  public async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email: ILike(email) });
  }

  private async checkIfEmailAlreadyExists(email: string) {
    const Email = await this.findUserByEmail(email);

    if (Email) {
      return true;
    }
  }
}
