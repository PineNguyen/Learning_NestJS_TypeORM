import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { GetUserDto } from './dto/getUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //When the path is users/showUser
  //Call the showAllUser method from userService
  @Get('show')
  getAll(@Query() getUserDto: GetUserDto) {
    return this.userService.showAllUser(getUserDto);
  }

  //When the path is users/showUser/id
  //Call the showOneUser method from userService
  @Get('show/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.showOneUserById(id);
  }

  //When the path is users/createUser
  //Call the createUser method with parameters that taken in request's body
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  //When the path is users/updateUser/id
  //Call the updateUser method with id that taken in request
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() body: UpdateUserDto
  ) {
    return this.userService.updateUserById(id, body);
  }

  //When the path is users/deleteUser/id
  //Call the deleteUser method with id that taken in request
  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }
}
