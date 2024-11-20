export class PlayerState {
    constructor( protected readonly config: PlayerConfig) {
        this._health = config.maxHealth
        this._attack = config.maxAttack
        this._defence = config.maxDefence
        this.lastUpdate = Date.now()
    }

    protected _health: number
    protected _attack: number
    protected _defence: number
    protected lastUpdate: number

    protected updateValues() {
        const now = Date.now()
        const diff = now - this.lastUpdate
        this._health = Math.max(this.config.maxHealth, this._health + this.config.restoreHealthRate * diff)
        this._attack = Math.max(this.config.maxAttack, this._attack + this.config.restoreAttackRate * diff)
        this._defence = Math.max(this.config.maxDefence, this._defence + this.config.restoreDefenceRate * diff)
        this.lastUpdate = now
    }

    get health() {
        this.updateValues()
        return this._health
    }

    get attack() {
        this.updateValues()
        return this._attack
    }
    get defence() {
        this.updateValues()
        return this._defence
    }



    getState() {
        this.updateValues()
        return {
            health: this._health,
            attack: this._attack,
            defence: this._defence
        }
    }
}

export interface PlayerConfig {
    id: string;
    league: {
        id: string;
        color: string;
    };
    maxHealth: number;
    restoreHealthRate: number;
    maxAttack: number;
    restoreAttackRate: number;
    maxDefence: number;
    restoreDefenceRate: number;
    speed: number
}

export class BasePlayer {
    constructor(public readonly config: PlayerConfig) {
    }

    move(i: number, j: number) {

    }

    attack(player: BasePlayer, value: number) {

    }

    damage(value: number) {

    }

    defence(value: number) {

    }

    get color() {
        return this.config.league.color
    }
}
