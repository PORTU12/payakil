import { Module } from '@nestjs/common';
import { PassportModule as NestPassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from '../../apps/repositories';
import { dbProviders } from '../../apps/providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  exports: [JwtModule],
  imports: [
    NestPassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: +process.env.JWT_EXPIRATION,
      },
    }),
    DatabaseModule,
  ],
  providers: [JwtAuthGuard, JwtAuthStrategy, UserRepository, ...dbProviders],
})
export class PassportModule {}
