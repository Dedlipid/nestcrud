import { Module } from '@nestjs/common';
import { EntityWriter } from './entity-writer/entity-writer';
import { EntityReader } from './entity-reader/entity-reader';
import {ConfigModule} from "@nestjs/config";

@Module({
  providers: [EntityWriter, EntityReader],
  exports: [EntityWriter, EntityReader],
  imports: [ConfigModule]
})
export class JsonDatabaseModule {}
