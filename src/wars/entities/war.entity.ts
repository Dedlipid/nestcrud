import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Participant} from "./participant.entity";
import {League} from "../../leagues/entities/league.entity";
import {Expose} from "class-transformer";

@Entity()
export class War {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    startAt: Date;

    @Column()
    endAt?: Date

    @OneToMany(() => Participant, (participant) => participant.war, { cascade: true })
    participants: Participant[];

    @ManyToOne(() => League, {
        cascade: false,
        nullable: true
    })
    winner?: League;

    @ManyToOne(() => League, {
        cascade: false,
        nullable: true
    })
    burnt?: League;

    @Expose()
    get withdraw() {
        return !!this.endAt && !this.burnt && !this.winner
    }
}
