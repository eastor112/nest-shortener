import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './url/entities/url.entity';
import { UrlModule } from './url/url.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'URL.sqlite',
      entities: [Url, User],
      synchronize: true,
    }),
    UrlModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
