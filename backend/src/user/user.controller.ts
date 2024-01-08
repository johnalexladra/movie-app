import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
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

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
