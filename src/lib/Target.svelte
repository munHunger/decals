<script>
  import { GLTF } from "@threlte/extras";
  export let mesh;
</script>

<GLTF
  useDraco="https://www.gstatic.com/draco/v1/decoders/"
  url="/bottle.glb"
  on:create={({ ref }) => {
    console.log(ref);
    mesh = ref.children[1]; //should be an array
    ref.visible = true;
  }}
/>
