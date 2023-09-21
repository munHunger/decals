<script>
  import { T } from "@threlte/core";
  import * as THREE from "three";
  import Target from "./Target.svelte";
  import Camera from "./Camera.svelte";
  import Lights from "./Lights.svelte";
  import Ground from "./Ground.svelte";
  import Decals from "./Decals.svelte";

  let camera;
  let mesh;

  const raycaster = new THREE.Raycaster();

  let lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
  let line;
  const mouseHelper = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 10));
  const orientation = new THREE.Euler();
  function checkIntersection(x, y) {
    if (mesh === undefined) return;

    const intersection = {
      intersects: false,
      point: new THREE.Vector3(),
      normal: new THREE.Vector3(),
    };

    const mouse = new THREE.Vector2();
    mouse.x = (x / window.innerWidth) * 2 - 1;
    mouse.y = -(y / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = [];
    raycaster.intersectObject(mesh, false, intersects);

    if (intersects.length > 0) {
      const p = intersects[0].point;
      mouseHelper.position.copy(p);
      intersection.point.copy(p);

      const n = intersects[0].face.normal.clone();
      n.transformDirection(mesh.matrixWorld);
      n.multiplyScalar(10);
      n.add(intersects[0].point);

      intersection.normal.copy(intersects[0].face.normal);
      mouseHelper.lookAt(n);
      const pos = line.geometry.attributes.position;
      pos.setXYZ(0, p.x, p.y, p.z);
      pos.setXYZ(1, n.x, n.y, n.z);
      pos.needsUpdate = true;
      line = line;

      intersection.intersects = true;

      intersects.length = 0;
    } else {
      intersection.intersects = false;
    }
    return intersection;
  }
  let decalRef;

  function click(e) {
    const intersection = checkIntersection(e.clientX, e.clientY);
    if (intersection.intersects) {
      const rotation = new THREE.Euler().copy(mouseHelper.rotation);
      decalRef.addDecal(new THREE.Vector3().copy(intersection.point), rotation);
    } else console.log("no intersect");
  }

  function mouseMove(e) {
    const intersection = checkIntersection(e.clientX, e.clientY);
    if (intersection.intersects) {
      orientation.copy(mouseHelper.rotation);
      const rotation = orientation;
      decalRef.updateTempDecal(
        new THREE.Vector3().copy(intersection.point),
        rotation
      );
    }
  }
</script>

<svelte:window on:click={click} on:mousemove={mouseMove} />
<Target bind:mesh />
<Camera bind:camera />
<Lights />
<Decals bind:this={decalRef} {mesh} />
<!-- <Ground /> -->
<T.Line bind:ref={line} geometry={lineGeometry} />
