import { VerifiesPasswordDto } from './../dtos/verify-password.dto';
import { UserEntity } from '../entities';
import { UserDto } from './../dtos/user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services';
import { User } from '../../shared/decorators/user.decorator';
import { CreateUserProfil } from '../dtos/create-user-profil.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  private logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Post('profiles')
  @ApiOperation({ summary: 'creating a new user' })
  async createUserProfil(
    @Body() createUserProfil: CreateUserProfil,
    @User() user: UserEntity,
  ) {
    try {
      const response = await this.userService.createUserProfil(
        createUserProfil,
        user?.company,
      );
      this.logger.log({
        message: `/Post /user/profil - Works with success`,
      });
      return response;
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }
  @Post()
  @ApiOperation({ summary: 'creating a new user' })
  Create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'getting all users' })
  public async getUsers(): Promise<UserDto[]> {
    const users = await this.userService.getUsers();
    return users;
  }
  @Get('/:id')
  @ApiOperation({ summary: 'getting user by Id' })
  public async getUserbyId(@Param('id') id: string) {
    const user = await this.userService.getUser(id);
    return user;
  }

  @Put('/:id')
  @ApiOperation({ summary: 'updating an exicting user' })
  public async editUser(@Body() updateUserDto: UserDto): Promise<UserEntity> {
    const user = await this.userService.editUser(updateUserDto);
    return user;
  }
  @Delete('/:id')
  @ApiOperation({ summary: 'deleting an exicting user' })
  public async deleteUser(@Param('id') id: string) {
    const deleteUser = await this.userService.deleteUser(id);
    return deleteUser;
  }
  @Put('update-password')
  @ApiOperation({ summary: 'updating user password ' })
  public async editPassword(
    @User() user: UserEntity,
    @Body() verifiesPasswordDto: VerifiesPasswordDto,
  ) {
    try {
      const userUpdated = await this.userService.updatePassword(
        user,
        verifiesPasswordDto,
      );
      this.logger.log({
        message: `/Put /update-password - Works with success`,
      });
      return userUpdated;
    } catch (e) {
      this.logger.error({
        message: `/Put /update-password - Something went wrong`,
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }
}
