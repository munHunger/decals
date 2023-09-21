<script>
  import { Canvas } from "@threlte/core";
  import Scene from "$lib/Scene.svelte";
</script>

<div class="app">
  <Canvas>
    <Scene />
  </Canvas>
</div>

<style>
  .app {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    background: radial-gradient(
      circle,
      rgb(149, 154, 160) 0%,
      rgb(94, 100, 105) 100%
    );
    background-position: 0, 0;
  }
</style>
