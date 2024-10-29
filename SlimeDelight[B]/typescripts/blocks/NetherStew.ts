import { world, PlayerInteractWithBlockAfterEvent, PlayerBreakBlockBeforeEvent, system, BlockVolume } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { ItemAPI } from "../lib/ItemAPI";

export class NetherStew {
    @EventAPI.register(world.beforeEvents.playerBreakBlock)
    break(args: PlayerBreakBlockBeforeEvent) {
        const player = args.player;
        const block = args.block;
        if (block.typeId != "slime_delight:nether_stew") return
        const stage = block.permutation.getState("farmersdelight:food_block_stage") as number
        if (stage != 0) {
            system.runTimeout(() => {
                block.dimension.setBlockType(block.location, "minecraft:air")
                ItemAPI.damage(player, player.selectedSlotIndex)
                block.dimension.playSound("dig.stone", block.location)
            })
            args.cancel = true
        }
    }
}