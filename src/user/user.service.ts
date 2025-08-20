import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  //This method will show all user in database with the find method
  showAllUser() {
    return this.userRepo.find();
  }

  //Similar showAllUser, but this method just show one function
  //that has the corresponding id by findOneBy method
  async showOneUser(id) {
    const user = await this.userRepo.findOneBy({ id });

    if(!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return this.userRepo.findBy(user);
    // return this.userRepo.findOneBy({ id });
  }

  //This function will create a new user 
  createUser(name: string, email: string) {
    const user = this.userRepo.create({ name, email });
    return this.userRepo.save(user);
  }

  //This function will take the user that has the user's id same as id in request
  //then update the new information for user
  async updateUser(id: number, name: string, email: string) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    Object.assign(user, { name, email});

    return this.userRepo.save(user);
  }

  //This functiton will delete a user 
  // that the user's id same as id in the request by delete method
  async deleteUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return this.userRepo.delete(user);
  }
}
