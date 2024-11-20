import {BaseWorld} from "./world/base";
import {SpawnHelper} from "./world/spawn.helper";
import {BasePlayer} from "./player/base";

async function main() {
    for (let i = 0;i < 1;i++) {
        const world = new BaseWorld({
            width: 100,
            height: 100
        })

        try {
            const helper = new SpawnHelper(world)
            for (let i = 0 ; i < 1000;i++) {
                helper.randomSpawn(new BasePlayer("green"))
            }
            for (let i = 0 ; i < 1000;i++) {
                helper.randomSpawn(new BasePlayer("red"))
            }
        } catch (e) {
            console.log(e)
        }


        await world.print(`map-${i}.png`, 1)
        console.log('done', i)
    }
}

main()
