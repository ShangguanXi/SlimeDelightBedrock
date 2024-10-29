import { BlockCustomComponent, BlockComponentPlayerInteractEvent, WorldInitializeBeforeEvent, world, Dimension, Vector3, BlockComponentRandomTickEvent, EntityInventoryComponent, Container, Direction, BlockComponentTickEvent, system } from "@minecraft/server";
import { ItemAPI } from "../../lib/ItemAPI";
import { EventAPI } from "../../lib/EventAPI";

class SlimePockyBoxComponent implements BlockCustomComponent {

    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }

    onPlayerInteract(args: BlockComponentPlayerInteractEvent): void { 
        const block = args.block;
        ItemAPI.spawn(block,"slime_delight:slime_pocky", 8)
        ItemAPI.spawn(block,"minecraft:paper", 1)
        block.dimension.setBlockType(block.location, "minecraft:air")

    }
}
export class SlimePockyBoxComponentRegister {
    @EventAPI.register(world.beforeEvents.worldInitialize)
    register(args: WorldInitializeBeforeEvent) {
        args.blockComponentRegistry.registerCustomComponent('slime_delight:slime_pocky_box', new SlimePockyBoxComponent());
    }

}
