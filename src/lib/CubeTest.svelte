<script>
  import { T } from "@threlte/core";
  import { spring } from "svelte/motion";
  const scale = spring(1);
  let rotation = 0;
  let mesh;

  const cubeShader = new THREE.ShaderMaterial({
    uniforms: {
      mode: { type: "int", value: 1 },
      Ka: { type: "float", value: 0.2 },
      Kd: { type: "float", value: 1 },
      Ks: { type: "float", value: 1 },
      shininessVal: { type: "float", value: 90 },
      ambientColor: { type: "vec3", value: new THREE.Color(0xf0f0f0) },
      diffuseColor: { type: "vec3", value: new THREE.Color(0xf0f0f0) },
      specularColor: { type: "vec3", value: new THREE.Color(0xff00f0) },
      lightPos: { type: "vec3", value: [0, 10, 10] },
      colorA: { type: "vec3", value: new THREE.Color(0xff0000) },
      colorB: { type: "vec3", value: new THREE.Color(0x0000ff) },
    },
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader(),
  });
  function vertexShader() {
    return `
//attribute vec3 position;
//attribute vec3 normal;
uniform mat4 projection, modelview, normalMat;
varying vec3 normalInterp;
varying vec3 vertPos;
uniform int mode;   // Rendering mode
uniform float Ka;   // Ambient reflection coefficient
uniform float Kd;   // Diffuse reflection coefficient
uniform float Ks;   // Specular reflection coefficient
uniform float shininessVal; // Shininess
// Material color
uniform vec3 ambientColor;
uniform vec3 diffuseColor;
uniform vec3 specularColor;
uniform vec3 lightPos; // Light position
varying vec4 color; //color

void main(){
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * modelViewPosition; 
  vec4 vertPos4 = modelViewMatrix * vec4(position, 1.0);
  vertPos = vec3(vertPos4) / vertPos4.w;
  normalInterp = vec3(normalMat * vec4(normal, 0.0));
  //gl_Position = projection * vertPos4;

  vec3 N = normalize(normal);
  vec3 L = normalize(lightPos - vertPos);
  // Lambert's cosine law
  float lambertian = max(dot(N, L), 0.0);
  float specular = 0.0;
  if(lambertian > 0.0) {
    vec3 R = reflect(-L, N);      // Reflected light vector
    vec3 V = normalize(-vertPos); // Vector to viewer
    // Compute the specular term
    float specAngle = max(dot(R, V), 0.0);
    specular = pow(specAngle, shininessVal);
  }
  color = vec4(Ka * ambientColor +
               Kd * lambertian * diffuseColor +
               Ks * specular * specularColor, 1.0);

  // only ambient
  if(mode == 2) color = vec4(Ka * ambientColor, 1.0);
  // only diffuse
  if(mode == 3) color = vec4(Kd * lambertian * diffuseColor, 1.0);
  // only specular
  if(mode == 4) color = vec4(Ks * specular * specularColor, 1.0);
}
  `;
  }
  function fragmentShader() {
    return `
    precision mediump float;

varying vec4 color;
void main() {
  gl_FragColor = color;
}
  `;
  }
</script>

<T.Mesh
  rotation.y={rotation}
  position.y={1}
  scale={$scale}
  on:pointerenter={() => scale.set(1)}
  on:pointerleave={() => scale.set(1)}
  castShadow
  material={cubeShader}
  bind:ref={mesh}
>
  <T.BoxGeometry args={[1, 2, 1]} />
</T.Mesh>
