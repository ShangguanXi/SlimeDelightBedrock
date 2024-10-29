import {WorldInitializeAfterEvent, system, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
let register = true
export class CookingPotRecipeRegister {
    @EventAPI.register(world.afterEvents.worldInitialize)
    register(args: WorldInitializeAfterEvent) {
        system.runInterval(() => {
            if (register) {
                world.getDimension("overworld").runCommandAsync("function slime_delight/recipe_registries");
                register = false
            }
        })
    }
}