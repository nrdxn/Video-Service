import { Body, Controller, Get, HttpCode, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from './decorators/user.decorator';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor (
    private readonly userService: UserService
  ) {}

  @Get('profile')
  @Auth()
  async getProfile (@CurrentUser('id') id: number) {
    return await this.userService.findUserById(id)
  }

  @Get('by-id/:id')
  async getUser (@Param('id') id: string) {
    return await this.userService.findUserById(+id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateUser (@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.updateProfile(+id, dto)
  }

  @HttpCode(200)
  @Patch('subscribe/:channelId')
  @Auth()
  async subscribe (
    @CurrentUser('id') id: number, @Param('channelId') channelId: string
  ) {
    return this.userService.subscribe(id, +channelId)
  }

  @Get()
  async getUsers () {
    return await this.userService.getAll()
  }
}
