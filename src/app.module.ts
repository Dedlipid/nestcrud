import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroesModule } from './heroes/heroes.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaguesModule } from './leagues/leagues.module';
import { WarsModule } from './wars/wars.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
      autoLoadEntities: true,
    }),
    HeroesModule,
    LeaguesModule,
    WarsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
