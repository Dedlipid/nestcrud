import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {War} from "./war.entity";
import {League} from "../../leagues/entities/league.entity";
import {Hero} from "../../heroes/entities/hero.entity";

@Entity()
export class Participant {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => War, (war) => war.participants, {
        cascade: false,
    })
    war: War;

    @ManyToOne(() => League, {
        cascade: false,
    })
    league: League;

    @ManyToOne(() => Hero, {
        cascade: false,
    })
    hero: Hero;
}
