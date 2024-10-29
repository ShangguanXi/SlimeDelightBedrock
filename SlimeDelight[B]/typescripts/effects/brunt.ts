import { Entity, EntityDamageCause, EntityHealthComponent, EntityHurtAfterEvent, system, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";

export class BruntEffect {
    constructor() {
        this.effect();
    }
    effect() {
        system.runInterval(() => {
            for (const player of world.getPlayers()) {
                const time = player.getDynamicProperty("slime_delight:brunt") as number
                if (time > 0) {
                    player.setDynamicProperty("slime_delight:brunt", time - 0.5)
                    player.applyDamage(4,{ cause: EntityDamageCause.lava})
                }
               else return
            }
        }, 10);
    }
    @EventAPI.register(world.afterEvents.entityHurt)
    hurt(args: EntityHurtAfterEvent) {
        const entity= args.hurtEntity as Entity
        const health = entity.getComponent(EntityHealthComponent.componentId);
        if (entity.typeId != "minecraft:player") return
        if(!health?.currentValue) entity.setDynamicProperty("slime_delight:brunt", 0)
    }
}