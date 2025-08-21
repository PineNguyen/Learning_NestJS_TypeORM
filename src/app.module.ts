import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      //I use the type casting directly because type is a union type
      //so it just receive a specific value
      type: process.env.DB_TYPE as 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true, 
    }),
    UserModule,
  ],
})
export class AppModule {}
