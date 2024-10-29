var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ItemStopUseAfterEvent, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
export class Foods {
    food(args) {
        const itemStack = args.itemStack;
        const player = args.source;
        const useDuration = args.useDuration;
        if (itemStack && useDuration == 0) {
            switch (itemStack.typeId) {
                case "slime_delight:gelatin_candy":
                    player.addEffect('regeneration', 20 * 20, { amplifier: 0 });
                    player.addEffect('jump_boost', 10 * 20, { amplifier: 0 });
                    break;
                case "slime_delight:slime_pudding":
                    player.addEffect('jump_boost', 30 * 20, { amplifier: 0 });
                    break;
                case "slime_delight:slice_of_grass_block_cake":
                    player.addEffect('jump_boost', 10 * 20, { amplifier: 0 });
                    break;
                case "slime_delight:slime_rice":
                    player.addEffect('jump_boost', 60 * 20, { amplifier: 0 });
                    break;
                case "slime_delight:magma_cream_rice":
                    player.addEffect('fire_resistance', 60 * 20, { amplifier: 0 });
                    break;
                case "slime_delight:bowl_of_goo":
                    player.addEffect('jump_boost', 50 * 20, { amplifier: 0 });
                    player.addEffect('nausea', 20 * 20, { amplifier: 0 });
                    break;
                case "slime_delight:bowl_of_nether_stew":
                    player.addEffect('fire_resistance', 180 * 20, { amplifier: 0 });
                    break;
                case "slime_delight:slime_pocky":
                    player.addEffect('jump_boost', 2 * 20, { amplifier: 1 });
                    break;
                case "slime_delight:golden_slime_ball":
                    player.addEffect('night_vision', 30 * 20, { amplifier: 1 });
                    player.addEffect('health_boost', 30 * 20, { amplifier: 1 });
                    player.addEffect('jump_boost', 30 * 20, { amplifier: 1 });
                    break;
            }
        }
    }
}
__decorate([
    EventAPI.register(world.afterEvents.itemStopUse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ItemStopUseAfterEvent]),
    __metadata("design:returntype", void 0)
], Foods.prototype, "food", null);
//# sourceMappingURL=Foods.js.map