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
class GrassBlockCakeComponent {
    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }
    onPlayerInteract(args) {
        const block = args.block;
        const player = args.player;
        const item = player.getComponent("inventory")?.container?.getItem(player.selectedSlotIndex);
        if (item?.hasTag("farmersdelight:is_knife")) {
            ItemAPI.damage(player, player.selectedSlotIndex);
            ItemAPI.spawn(block, new ItemStack("slime_delight:slice_of_grass_block_cake"));
        }
        else
            player.addEffect('jump_boost', 10 * 20, { amplifier: 0 });
        const state = block.permutation.getState('slime_delight:food_block_stage');
        if (state != 7)
            block.setPermutation(block.permutation.withState('slime_delight:food_block_stage', state + 1));
        else
            block.dimension.setBlockType(block.location, "minecraft:air");
        world.playSound("use.cloth", block.location);
    }
}
export class GrassBlockCakeComponentRegister {
    register(args) {
        args.blockComponentRegistry.registerCustomComponent('slime_delight:grass_block_cake', new GrassBlockCakeComponent());
    }
}
__decorate([
    EventAPI.register(world.beforeEvents.worldInitialize),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WorldInitializeBeforeEvent]),
    __metadata("design:returntype", void 0)
], GrassBlockCakeComponentRegister.prototype, "register", null);
//# sourceMappingURL=GrassBlockCakeComponent.js.map