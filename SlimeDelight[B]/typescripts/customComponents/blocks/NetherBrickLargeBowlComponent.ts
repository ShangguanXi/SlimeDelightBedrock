import { BlockCustomComponent, BlockComponentPlayerInteractEvent, WorldInitializeBeforeEvent, world, Dimension, Vector3, BlockComponentRandomTickEvent, EntityInventoryComponent, Container, Direction, BlockComponentTickEvent, system, Player, ItemStack } from "@minecraft/server";
import { ItemAPI } from "../../lib/ItemAPI";
import { EventAPI } from "../../lib/EventAPI";

class NetherBrickLargeBowlComponent implements BlockCustomComponent {

    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }

    onPlayerInteract(args: BlockComponentPlayerInteractEvent): void {
        const block = args.block;
        const player = args.player as Player
        const item = player.getComponent("inventory")?.container?.getItem(player.selectedSlotIndex)
        if (item?.typeId!="minecraft:lava_bucket") return
        const newItem = new ItemStack('minecraft:bucket')
        ItemAPI.replace(player, player.selectedSlotIndex,newItem)
        block.dimension.playSound("bucket.fill_lava", block.location)
        block.dimension.setBlockType(block.location, "slime_delight:lava_large_bowl")

    }
}
export class NetherBrickLargeBowlComponentRegister {
    @EventAPI.register(world.beforeEvents.worldInitialize)
    register(args: WorldInitializeBeforeEvent) {
        args.blockComponentRegistry.registerCustomComponent('slime_delight:nether_brick_large_bowl', new NetherBrickLargeBowlComponent());
    }

}
