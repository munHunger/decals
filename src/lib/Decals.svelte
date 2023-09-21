<script>
  import { DecalGeometry } from "three/addons/geometries/DecalGeometry.js";
  import { T } from "@threlte/core";
  import * as THREE from "three";

  export let mesh;

  let tempDecal;

  const textureLoader = new THREE.TextureLoader();
  const decal = textureLoader.load("/favicon.png");
  const decalMat = new THREE.MeshPhongMaterial({
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -4,
    map: decal,
    transparent: true,
  });

  export function updateTempDecal(position, rotation) {
    const material = decalMat.clone();
    const size = new THREE.Vector3(1, 1, 1);
    const m = new THREE.Mesh(
      new DecalGeometry(mesh, position, rotation, size),
      material
    );
    m.renderOrder = decals.length; // give decals a fixed render order
    tempDecal = m;
  }

  export function addDecal(position, rotation) {
    const material = decalMat.clone();
    const size = new THREE.Vector3(1, 1, 1);
    const m = new THREE.Mesh(
      new DecalGeometry(mesh, position, rotation, size),
      material
    );
    m.renderOrder = decals.length; // give decals a fixed render order

    decals = decals.concat([m]);
  }
  let decals = [];
</script>

{#each decals.concat([tempDecal]).filter((v) => v) as decal}
  <!-- <TransformControls mode="translate"> -->
  <T.Mesh is={decal} />
  <!-- </TransformControls> -->
{/each}
