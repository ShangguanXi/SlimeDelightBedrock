var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WorldInitializeBeforeEvent, world } from "@minecraft/server";
import { ItemAPI } from "../../lib/ItemAPI";
import { EventAPI } from "../../lib/EventAPI";
class NetherStewComponent {
    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }
    onPlayerInteract(args) {
        const block = args.block;
        const player = args.player;
        const item = player.getComponent("inventory")?.container?.getItem(player.selectedSlotIndex);
        if (item?.typeId != "slime_delight:nether_brick_bowl") {
            player.onScreenDisplay.setActionBar({ translate: 'slime_delight.blockfood.nether_brick_bowl' });
            return;
        }
        ItemAPI.clear(player, player.selectedSlotIndex);
        ItemAPI.add(player, 'slime_delight:bowl_of_nether_stew');
        block.dimension.playSound("bucket.empty_lava", block.location);
        const stage = block.permutation.getState("farmersdelight:food_block_stage");
        if (stage != 3)
            block.setPermutation(block.permutation.withState("farmersdelight:food_block_stage", stage + 1));
        else
            block.dimension.setBlockType(block.location, "slime_delight:nether_brick_large_bowl");
    }
}
export class NetherStewComponentRegister {
    register(args) {
        args.blockComponentRegistry.registerCustomComponent('slime_delight:nether_stew', new NetherStewComponent());
    }
}
__decorate([
    EventAPI.register(world.beforeEvents.worldInitialize),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WorldInitializeBeforeEvent]),
    __metadata("design:returntype", void 0)
], NetherStewComponentRegister.prototype, "register", null);
//# sourceMappingURL=NetherStewComponent.js.map