import { BlockCustomComponent, BlockComponentPlayerInteractEvent, WorldInitializeBeforeEvent, world, Dimension, Vector3, BlockComponentRandomTickEvent, EntityInventoryComponent, Container, Direction, BlockComponentTickEvent, system, Player, ItemStack } from "@minecraft/server";
import { ItemAPI } from "../../lib/ItemAPI";
import { EventAPI } from "../../lib/EventAPI";

class LavaLargeBowlComponent implements BlockCustomComponent {

    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }

    onPlayerInteract(args: BlockComponentPlayerInteractEvent): void {
        const block = args.block;
        const player = args.player as Player
        const item = player.getComponent("inventory")?.container?.getItem(player.selectedSlotIndex)
        if (item?.typeId != "minecraft:bucket"){
            player.setDynamicProperty("slime_delight:brunt", 15)
        }
        else{
            const newItem = new ItemStack('minecraft:lava_bucket')
            ItemAPI.replace(player, player.selectedSlotIndex, newItem)
        }
        block.dimension.playSound("bucket.empty_lava", block.location)
        block.dimension.setBlockType(block.location, "slime_delight:nether_brick_large_bowl")
       

    }
}
export class LavaLargeBowlComponentRegister {
    @EventAPI.register(world.beforeEvents.worldInitialize)
    register(args: WorldInitializeBeforeEvent) {
        args.blockComponentRegistry.registerCustomComponent('slime_delight:lava_large_bowl', new LavaLargeBowlComponent());
    }

}
