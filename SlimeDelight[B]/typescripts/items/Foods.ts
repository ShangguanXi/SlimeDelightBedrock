import { ItemStopUseAfterEvent, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";

export class Foods {
  @EventAPI.register(world.afterEvents.itemStopUse)
  food(args: ItemStopUseAfterEvent) {
    const itemStack = args.itemStack;
    const player = args.source
    const useDuration = args.useDuration
    if (itemStack && useDuration == 0) {
      switch (itemStack.typeId) {
        case "slime_delight:gelatin_candy":
          player.addEffect('regeneration', 20 * 20, { amplifier: 0 })
          player.addEffect('jump_boost', 10 * 20, { amplifier: 0 })
          break
        case "slime_delight:slime_pudding":
          player.addEffect('jump_boost', 30 * 20, { amplifier: 0 })
          break
        case "slime_delight:slice_of_grass_block_cake":
          player.addEffect('jump_boost', 10 * 20, { amplifier: 0 })
          break
        case "slime_delight:slime_rice":
          player.addEffect('jump_boost', 60 * 20, { amplifier: 0 })
          break
        case "slime_delight:magma_cream_rice":
          player.addEffect('fire_resistance', 60 * 20, { amplifier: 0 })
          break
        case "slime_delight:bowl_of_goo":
          player.addEffect('jump_boost', 50 * 20, { amplifier: 0 })
          player.addEffect('nausea', 20 * 20, { amplifier: 0 })
          break
        case "slime_delight:bowl_of_nether_stew":
          player.addEffect('fire_resistance', 180 * 20, { amplifier: 0 })
          break
        case "slime_delight:slime_pocky":
          player.addEffect('jump_boost', 2 * 20, { amplifier: 1 })
          break
        case "slime_delight:golden_slime_ball":
          player.addEffect('night_vision', 30 * 20, { amplifier: 1 })
          player.addEffect('health_boost', 30 * 20, { amplifier: 1 })
          player.addEffect('jump_boost', 30 * 20, { amplifier: 1 })
          break
      }
    }
  }
}