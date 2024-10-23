import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Participant} from "../../entities/participant.entity";
import {Attack} from "./attack.entity";
import {Expose} from "class-transformer";

@Entity()
export class Fight {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    startAt: Date;

    @Column()
    endAt?: Date

    @ManyToMany(() => Participant)
    @JoinTable()
    participants: Participant[]

    @OneToMany(() => Attack, (attack) => attack.fight, {cascade: true})
    attacks: Attack[]

    @ManyToMany(() => Participant)
    @JoinTable()
    winner?: Participant[];

    @ManyToMany(() => Participant)
    @JoinTable()
    burnt?: Participant[];

    @Expose()
    get withdraw() {
        return !!this.endAt && !this.burnt && !this.winner
    }
}
