import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '!!okejhokej',
      database: 'art-gallery',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
