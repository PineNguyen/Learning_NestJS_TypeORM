import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //When the path is users/showUser
  //Call the showAllUser method from userService
  @Get('showUser')
  getAll() {
    return this.userService.showAllUser();
  }

  //When the path is users/showUser/id
  //Call the showOneUser method from userService
  @Get('showUser/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.showOneUser(id);
  }

  //When the path is users/createUser
  //Call the createUser method with parameters that taken in request's body
  @Post('createUser')
  create(@Body() body: { name: string; email: string }) {
    return this.userService.createUser(body.name, body.email);
  }

  //When the path is users/updateUser/id
  //Call the updateUser method with id that taken in request
  @Put('updateUser/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: { name: string; email: string }) {
    return this.userService.updateUser(id, body.name, body.email);
  }

  //When the path is users/deleteUser/id
  //Call the deleteUser method with id that taken in request
  @Delete('deleteUser/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
