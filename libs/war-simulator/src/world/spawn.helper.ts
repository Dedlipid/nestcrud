import {BaseWorld, BlockState, BlockType} from "../world/base";
import {BasePlayer} from "../player/base";

export class SpawnHelper {
    constructor(public readonly world: BaseWorld) {}

    checkBlock(i: number, j: number) {
        if (i >= this.world.options.width || j >= this.world.options.height) return false;
        if (j < 0 || i < 0) return false;
        const block = this.world.getBlock(i, j);
        return block.state === BlockState.open && block.type === BlockType.open;
    }

    randomSpawn(player: BasePlayer) {
        let centerI = Math.floor(Math.random() * this.world.options.width);
        let centerJ = Math.floor(Math.random() * this.world.options.height);
        let rad = 1;

        // Look for an open block in increasing radius
        while (true) {
            for (let i = centerI - rad; i <= centerI + rad; i++) {
                for (let j = centerJ - rad; j <= centerJ + rad; j++) {
                    if (this.checkBlock(i, j)) {
                        this.world.spawn(player, i, j);
                        return;
                    }
                }
            }
            rad++;
            if (rad > Math.max(this.world.options.width, this.world.options.height)) {
                throw new Error('No available block!');
            }
        }
    }
}
