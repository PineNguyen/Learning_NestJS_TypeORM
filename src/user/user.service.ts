import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { GetUserDto } from './dto/getUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  //This method will show all user in database with the find method
  //Put in three parameters
  //page: the page that will show search results
  //limit: number of result that will show on page
  //search: the value that user want to find
  async showAllUser(options: GetUserDto) {
    const { page, limit, search } = options;

    const [data, total] = await this.userRepo.findAndCount({
      where: search
        ? [
            { name: Like(`%${search}%`) },
            { email: Like(`%${search}%`) },
          ]
        : {},
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    return {
      data,
      total,
      page,
      //totalPage is the number of page corresponding with total user and limit value
      totalPage: Math.ceil(total / limit),
    };
  }

  //Similar showAllUser, but this method just show one function
  //that has the corresponding id by findOneBy method
  //id is the id of user that want to show
  async showOneUserById(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if(!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return user;
    // return this.userRepo.findOneBy({ id });
  }

  //This function will create a new user 
  //put in a DTO userData include information of new user to create
  createUser(userData: CreateUserDto) {
    const user = this.userRepo.create(userData);
    return this.userRepo.save(user);
  }

  //This function will take the user that has the user's id same as id in request
  //then update the new information for user
  //put in the id of user that want to update
  //and DTO newUserData include new information of user to update
  async updateUserById(id: number, newDataUser: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });

    //throw an exception if not find user with the id
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    Object.assign(user, newDataUser);

    return this.userRepo.save(user);
  }

  //This functiton will delete a user 
  //that the user's id same as id in the request by delete method
  //put in the id of user that want to delete
  async deleteUserById(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    //throw an exception if not find user with the id
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return this.userRepo.delete(user);
  }
}
