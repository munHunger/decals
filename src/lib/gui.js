import { writable } from "svelte/store";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const gui = new GUI();
export const params = {
  l1Rot: 0,
};
gui.add(params, "l1Rot", 0, Math.PI * 2);
gui.open();
