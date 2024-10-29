import { BlockCustomComponent, BlockComponentPlayerInteractEvent, WorldInitializeBeforeEvent, world, Dimension, Vector3, BlockComponentRandomTickEvent, EntityInventoryComponent, Container, Direction, BlockComponentTickEvent, system, Player, ItemStack } from "@minecraft/server";
import { ItemAPI } from "../../lib/ItemAPI";
import { EventAPI } from "../../lib/EventAPI";

class GrassBlockCakeComponent implements BlockCustomComponent {

    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }

    onPlayerInteract(args: BlockComponentPlayerInteractEvent): void {
        const block = args.block;
        const player = args.player as Player
        const item = player.getComponent("inventory")?.container?.getItem(player.selectedSlotIndex)
        if (item?.hasTag("farmersdelight:is_knife")) {
            ItemAPI.damage(player, player.selectedSlotIndex)
            ItemAPI.spawn(block, new ItemStack("slime_delight:slice_of_grass_block_cake"))
        }
        else player.addEffect('jump_boost', 10 * 20, { amplifier: 0 })
        const state = block.permutation.getState('slime_delight:food_block_stage') as number
        if (state != 7)
            block.setPermutation(block.permutation.withState('slime_delight:food_block_stage',state+ 1))
        else block.dimension.setBlockType(block.location, "minecraft:air")
        world.playSound("use.cloth", block.location)

    }
}
export class GrassBlockCakeComponentRegister {
    @EventAPI.register(world.beforeEvents.worldInitialize)
    register(args: WorldInitializeBeforeEvent) {
        args.blockComponentRegistry.registerCustomComponent('slime_delight:grass_block_cake', new GrassBlockCakeComponent());
    }

}
