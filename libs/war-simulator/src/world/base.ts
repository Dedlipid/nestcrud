import {createCanvas} from "canvas";
import {createWriteStream} from 'fs'
import {BasePlayer} from "@brood/war-simulator/player/base";

export enum BlockState {
    open,
    taken,
}

export enum BlockType {
    blocked,
    open,
}

class Block {
    public state: BlockState = BlockState.open
    public type: BlockType
    public player: BasePlayer
}

interface WorldOption {
    width: number;
    height: number;
}

export class BaseWorld {
    public map: Array<Array<Block>> = [];

    constructor(public readonly options: WorldOption) {
        this.seedWorld()
    }

    getBlock(i: number, j: number): Block {
        const row = this.map[i]
        if (row) {
            const col = row[j]
            if (col) {
                return col
            }
        }
        throw new Error(`Block is out range (${i}, ${j})`)
    }

    protected seedWorld() {
        for (let i = 0; i < this.options.width; i++) {
            const row = []
            for (let j = 0; j < this.options.height; j++) {
                const block = new Block()
                block.type = Math.random() < 0.1 ? BlockType.blocked : BlockType.open
                row.push(block)
            }
            this.map.push(row)
        }
    }

    print(name = "map.png", scaleFactor = 10) {
        return new Promise((resolve, reject) => {
            const canvas = createCanvas(this.options.width * scaleFactor, this.options.height * scaleFactor)
            const ctx = canvas.getContext('2d')
            for (let i = 0; i < this.options.width; i++) {
                for (let j = 0; j < this.options.height; j++) {
                    const block = this.getBlock(i, j)
                    if (block.state === BlockState.open) {
                        switch (block.type) {
                            case BlockType.blocked:
                                ctx.fillStyle = "rgb(255,136,0)";
                                break
                            case BlockType.open:
                                ctx.fillStyle = "rgb(255,255,255)";
                                break
                        }
                    } else {
                        if (block.player) {
                            ctx.fillStyle = block.player.color;
                        }
                    }
                    ctx.fillRect(i * scaleFactor, j * scaleFactor, scaleFactor, scaleFactor)
                }
            }
            const outStream = createWriteStream(name)
            outStream.on('finish', resolve)
            outStream.on('error', reject)
            canvas.createPNGStream().pipe(outStream)
        })
    }

    spawn(player: BasePlayer, i: number, j: number) {
        const block = this.getBlock(i, j)
        if (block.type === BlockType.open) {
            if (block.state === BlockState.open) {
                block.state = BlockState.taken
                block.player = player
            } else throw new Error('block is taken')
        } else throw new Error('block is blocked')
    }


}
