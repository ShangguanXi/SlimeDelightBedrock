var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EntityDamageCause, EntityHealthComponent, EntityHurtAfterEvent, system, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
export class BruntEffect {
    constructor() {
        this.effect();
    }
    effect() {
        system.runInterval(() => {
            for (const player of world.getPlayers()) {
                const time = player.getDynamicProperty("slime_delight:brunt");
                if (time > 0) {
                    player.setDynamicProperty("slime_delight:brunt", time - 0.5);
                    player.applyDamage(4, { cause: EntityDamageCause.lava });
                }
                else
                    return;
            }
        }, 10);
    }
    hurt(args) {
        const entity = args.hurtEntity;
        const health = entity.getComponent(EntityHealthComponent.componentId);
        if (entity.typeId != "minecraft:player")
            return;
        if (!health?.currentValue)
            entity.setDynamicProperty("slime_delight:brunt", 0);
    }
}
__decorate([
    EventAPI.register(world.afterEvents.entityHurt),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EntityHurtAfterEvent]),
    __metadata("design:returntype", void 0)
], BruntEffect.prototype, "hurt", null);
//# sourceMappingURL=brunt.js.map