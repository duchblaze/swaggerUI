import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './users/entities/user.entity';
// import { ModuleWithModuleRef } from './module-with-module-ref';

@Module({
  imports: [
    UsersModule,
    // ModuleWithModuleRef,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Duchblaze@100',
      database: 'thread',
      entities: [Employee],
      synchronize: true,
      //synchronize: true, this should only be true in development.
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
