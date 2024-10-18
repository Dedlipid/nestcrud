import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HeroesModule} from './heroes/heroes.module';
import {JsonDatabaseModule} from './json-database/json-database.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [ConfigModule.forRoot(), JsonDatabaseModule, HeroesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
