import { Module } from '@nestjs/common';
import { dbProviders } from 'apps/providers';
import * as controllers from './apps/controllers';
import * as services from './apps/services';
import * as repositories from './apps/repositories';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './utils/mail/mail.module';
import { PassportModule } from './shared/passport/passport.module';
@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailModule,
    PassportModule,
  ],
  controllers: [...Object.values(controllers)],
  providers: [
    ...Object.values(services),
    ...Object.values(repositories),
    ...dbProviders,
  ],
})
export class AppModule {}
