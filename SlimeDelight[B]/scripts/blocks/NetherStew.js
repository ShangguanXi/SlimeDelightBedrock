var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { world, PlayerBreakBlockBeforeEvent, system } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { ItemAPI } from "../lib/ItemAPI";
export class NetherStew {
    break(args) {
        const player = args.player;
        const block = args.block;
        if (block.typeId != "slime_delight:nether_stew")
            return;
        const stage = block.permutation.getState("farmersdelight:food_block_stage");
        if (stage != 0) {
            system.runTimeout(() => {
                block.dimension.setBlockType(block.location, "minecraft:air");
                ItemAPI.damage(player, player.selectedSlotIndex);
                block.dimension.playSound("dig.stone", block.location);
            });
            args.cancel = true;
        }
    }
}
__decorate([
    EventAPI.register(world.beforeEvents.playerBreakBlock),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PlayerBreakBlockBeforeEvent]),
    __metadata("design:returntype", void 0)
], NetherStew.prototype, "break", null);
//# sourceMappingURL=NetherStew.js.map