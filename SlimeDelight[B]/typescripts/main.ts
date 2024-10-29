import { GrassBlockCake } from "./blocks/GrassBlockCake";
import { NetherStew } from "./blocks/NetherStew";
import { GrassBlockCakeComponentRegister } from "./customComponents/blocks/GrassBlockCakeComponent";
import { LavaLargeBowlComponentRegister } from "./customComponents/blocks/LavaLargeBowlComponent";
import { NetherBrickLargeBowlComponentRegister } from "./customComponents/blocks/NetherBrickLargeBowlComponent";
import { NetherStewComponentRegister } from "./customComponents/blocks/NetherStewComponent";
import { SlimePockyBoxComponentRegister } from "./customComponents/blocks/SlimePockyBoxComponent";
import { BruntEffect } from "./effects/brunt";
import { CookingPotRecipeRegister } from "./register/CookingPotRecipeRegister";

new SlimePockyBoxComponentRegister();
new NetherBrickLargeBowlComponentRegister();
new NetherStewComponentRegister();
new LavaLargeBowlComponentRegister();
new GrassBlockCakeComponentRegister();

new BruntEffect();

new NetherStew();
new GrassBlockCake();
new CookingPotRecipeRegister();