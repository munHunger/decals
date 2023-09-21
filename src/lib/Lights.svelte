<script>
  import { T } from "@threlte/core";
  let l1Rot = 1;
  let l2Rot = -1;
</script>

<T.AmbientLight />
<T.DirectionalLight
  position={[Math.sin(l1Rot) * 10, 10, Math.cos(l1Rot) * 10]}
  castShadow
  intensity={0.8}
/>
<T.DirectionalLight
  position={[Math.sin(l2Rot) * 10, 10, Math.cos(l2Rot) * 10]}
  intensity={0.2}
/>
