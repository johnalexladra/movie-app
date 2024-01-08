import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { AuthModule } from './auth/auth.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    MovieModule,
    AuthModule,
    FavoriteModule,
  ],
})
export class AppModule {}
