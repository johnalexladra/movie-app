import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

// @UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async checkUser(@Query('email') email:string) {
    return await this.userService.findByEmail(email) ? true : false;
  }

  @UseGuards(JwtGuard)
  @Get('all') 
  async getUsers(@GetUser('role') role: string) {
    return await this.userService.getUsers(role)
  }

  @Get(':id')
  async getUserProfile(@Param('id') id: number) {
    return await this.userService.findById(id);
  }

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch(':id')
  update(@Param('id') userId: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(userId, updateUserDto);
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(userId, updateUserDto);
  }

  // @Delete()
  // async deleteUser(@GetUser('id') userId: number, @Body() email: string) {
  //   return this.userService.removeUser(userId, email);
  // }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  @Delete()
  deleteFavorite(
    @GetUser('role') role: string,
    @Query("email") email: string,
  ) {
    return this.userService.deleteUser(role, email);
  }
}
