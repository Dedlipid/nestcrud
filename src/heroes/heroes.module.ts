import {Module} from '@nestjs/common';
import {HeroesService} from './heroes.service';
import {HeroesController} from './heroes.controller';
import {JsonDatabaseModule} from "../json-database/json-database.module";

@Module({
    controllers: [HeroesController],
    providers: [HeroesService],
    imports: [JsonDatabaseModule]
})
export class HeroesModule {
}
