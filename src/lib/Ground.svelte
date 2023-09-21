<script>
  import { T } from "@threlte/core";
  import { Grid } from "@threlte/extras";
</script>

<Grid sectionSize={0} />
<T.Mesh rotation.x={-Math.PI / 2} receiveShadow>
  <T.CircleGeometry args={[4, 40]} />
  <T.ShadowMaterial color="white" />
</T.Mesh>
