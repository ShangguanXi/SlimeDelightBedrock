var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WorldInitializeBeforeEvent, world, ItemStack } from "@minecraft/server";
import { ItemAPI } from "../../lib/ItemAPI";
import { EventAPI } from "../../lib/EventAPI";
class NetherBrickLargeBowlComponent {
    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }
    onPlayerInteract(args) {
        const block = args.block;
        const player = args.player;
        const item = player.getComponent("inventory")?.container?.getItem(player.selectedSlotIndex);
        if (item?.typeId != "minecraft:lava_bucket")
            return;
        const newItem = new ItemStack('minecraft:bucket');
        ItemAPI.replace(player, player.selectedSlotIndex, newItem);
        block.dimension.playSound("bucket.fill_lava", block.location);
        block.dimension.setBlockType(block.location, "slime_delight:lava_large_bowl");
    }
}
export class NetherBrickLargeBowlComponentRegister {
    register(args) {
        args.blockComponentRegistry.registerCustomComponent('slime_delight:nether_brick_large_bowl', new NetherBrickLargeBowlComponent());
    }
}
__decorate([
    EventAPI.register(world.beforeEvents.worldInitialize),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WorldInitializeBeforeEvent]),
    __metadata("design:returntype", void 0)
], NetherBrickLargeBowlComponentRegister.prototype, "register", null);
//# sourceMappingURL=NetherBrickLargeBowlComponent.js.map