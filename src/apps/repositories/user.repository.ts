import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne(id);
  }

  create(user: UserEntity): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
  }
  async update(user: UserEntity): Promise<UserEntity> {
    return await this.usersRepository.save(user);
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['company'],
    });
  }
}
