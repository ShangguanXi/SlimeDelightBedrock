import { BlockCustomComponent, BlockComponentPlayerInteractEvent, WorldInitializeBeforeEvent, world, Dimension, Vector3, BlockComponentRandomTickEvent, EntityInventoryComponent, Container, Direction, BlockComponentTickEvent, system, Player, ItemStack } from "@minecraft/server";
import { ItemAPI } from "../../lib/ItemAPI";
import { EventAPI } from "../../lib/EventAPI";

class NetherStewComponent implements BlockCustomComponent {

    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }
    onPlayerInteract(args: BlockComponentPlayerInteractEvent): void {
        const block = args.block;
        const player = args.player as Player
        const item = player.getComponent("inventory")?.container?.getItem(player.selectedSlotIndex)
        if (item?.typeId != "slime_delight:nether_brick_bowl") {
            player.onScreenDisplay.setActionBar({ translate: 'slime_delight.blockfood.nether_brick_bowl' });
            return
        }
        ItemAPI.clear(player, player.selectedSlotIndex)
        ItemAPI.add(player, 'slime_delight:bowl_of_nether_stew')
        block.dimension.playSound("bucket.empty_lava", block.location)
        const stage = block.permutation.getState("farmersdelight:food_block_stage") as number
        if (stage != 3) block.setPermutation(block.permutation.withState("farmersdelight:food_block_stage", stage + 1))
        else block.dimension.setBlockType(block.location, "slime_delight:nether_brick_large_bowl")
    }
}
export class NetherStewComponentRegister {
    @EventAPI.register(world.beforeEvents.worldInitialize)
    register(args: WorldInitializeBeforeEvent) {
        args.blockComponentRegistry.registerCustomComponent('slime_delight:nether_stew', new NetherStewComponent());
    }
}
