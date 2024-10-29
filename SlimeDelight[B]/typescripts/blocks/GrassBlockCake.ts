import { world, PlayerInteractWithBlockAfterEvent, PlayerBreakBlockBeforeEvent, system, BlockVolume } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { ItemAPI } from "../lib/ItemAPI";

export class GrassBlockCake {
    @EventAPI.register(world.beforeEvents.playerBreakBlock)
    break(args: PlayerBreakBlockBeforeEvent) {
        const player = args.player;
        const block = args.block;
        if (block.typeId != "slime_delight:grass_block_cake") return
        const stage = block.permutation.getState("slime_delight:food_block_stage") as number
        if (stage != 1) {
            system.runTimeout(() => {
                block.dimension.setBlockType(block.location, "minecraft:air")
                ItemAPI.damage(player, player.selectedSlotIndex)
                block.dimension.playSound("dig.stone", block.location)
            })
            args.cancel = true
        }
    }
}