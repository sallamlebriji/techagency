import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// Five architectural elements, shared by the assembled and exploded compositions.
const elements = [
  { size: [.34, 1.42, .36], home: [-.8, .73, 0], spread: [-.65, .55, .3], material: 'metal' },
  { size: [.34, 1.42, .36], home: [.8, .73, 0], spread: [.65, .55, -.3], material: 'metal' },
  { size: [.32, 3.12, .32], home: [0, 0, .07], spread: [0, 0, .8], rotation: .588, material: 'gold' },
  { size: [.34, 1.42, .36], home: [-.8, -.73, 0], spread: [-.65, -.55, -.2], material: 'metal' },
  { size: [.34, 1.42, .36], home: [.8, -.73, 0], spread: [.65, -.55, .2], material: 'metal' },
];

export function createSculpture(host, { light = false, reduced = false, onFailure }) {
  let mobile = matchMedia('(max-width: 767px)').matches;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = light ? 1 : 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, .1, 50);
  camera.position.set(0, .1, 7.6);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, .04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();

  const materials = {
    metal: new THREE.MeshPhysicalMaterial({ color: '#c8cbc9', metalness: 1, roughness: .22, envMapIntensity: 1.3, clearcoat: .3, anisotropy: .5 }),
    gold: new THREE.MeshPhysicalMaterial({ color: '#ab844b', metalness: 1, roughness: .27, envMapIntensity: .9 }),
    glass: new THREE.MeshPhysicalMaterial({ color: '#656967', metalness: .15, roughness: .12, transmission: .78, thickness: .55, ior: 1.45, transparent: true, opacity: .92 }),
  };
  const group = new THREE.Group();
  scene.add(group);
  const pieces = elements.map(element => {
    const geometry = new RoundedBoxGeometry(...element.size, mobile ? 2 : 4, .035);
    const mesh = new THREE.Mesh(geometry, materials[element.material].clone());
    mesh.position.fromArray(element.home);
    group.add(mesh);
    return mesh;
  });
  scene.add(new THREE.HemisphereLight(0xffffff, 0x161615, .6));
  const key = new THREE.DirectionalLight(0xfff4e3, 2.5);
  key.position.set(-3, 4, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 2);
  rim.position.set(4, 2, -2);
  scene.add(rim);

  const state = { explode: 0, approach: 0, active: -1, paused: reduced, orientation: 0, finish: 'signature' };
  const pointer = { x: 0, y: 0 };
  let running = false;
  let destroyed = false;
  let frame = 0;
  let last = 0;
  let elapsed = 0;
  let contextValid = true;
  let lastPaint = 0;
  const stats = { frames: 0, drawCalls: 0, running: false };
  const pieceScale = new THREE.Vector3();
  function render(now = performance.now()) {
    if (destroyed || !contextValid) return;
    if (running && !state.paused && now - lastPaint < (mobile ? 1000 / 24 : 1000 / 30)) {
      frame = requestAnimationFrame(render);
      return;
    }
    lastPaint = now;
    const delta = Math.min((now - (last || now)) / 1000, .05);
    last = now;
    if (!state.paused) elapsed += delta;
    const angle = reduced ? .16 : .16 + Math.sin(elapsed * .14) * .12;
    if (reduced || state.paused) {
      group.rotation.y = angle + state.orientation;
      group.rotation.x = .04;
    } else {
      group.rotation.y += (angle + state.orientation + pointer.x * .16 - group.rotation.y) * .06;
      group.rotation.x += (.04 + pointer.y * .06 - group.rotation.x) * .06;
    }
    group.rotation.z = 0;
    group.position.y = state.paused ? 0 : Math.sin(elapsed * .7) * .055;
    group.scale.setScalar(1 + state.approach * .12);
    const spread = Math.min(state.explode, 1) * (mobile ? .58 : 1);
    pieces.forEach((piece, index) => {
      const element = elements[index];
      piece.position.set(...element.home.map((value, axis) => value + element.spread[axis] * spread));
      piece.rotation.z = (element.rotation || 0) + spread * (index % 2 ? .1 : -.08);
      const size = state.active === index ? 1.06 : 1;
      piece.scale.lerp(pieceScale.set(size, size, size), .08);
      piece.material.emissive.set(state.active === index ? '#ab844b' : '#000000');
      piece.material.emissiveIntensity = state.active === index ? .12 : 0;
    });
    renderer.render(scene, camera);
    stats.frames++;
    stats.drawCalls = renderer.info.render.calls;
    host.dataset.frames = String(stats.frames);
    host.dataset.explode = state.explode.toFixed(2);
    host.dataset.drawCalls = String(stats.drawCalls);
    host.dataset.pixelRatio = String(renderer.getPixelRatio());
    host.dataset.orientation = state.orientation.toFixed(2);
    host.dataset.finish = state.finish;
    if (running && !state.paused) frame = requestAnimationFrame(render);
  }
  function resize() {
    if (destroyed) return;
    const { width, height } = host.getBoundingClientRect();
    mobile = matchMedia('(max-width: 767px)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 1.5));
    renderer.setSize(Math.max(width, 1), Math.max(height, 1), false);
    camera.aspect = width / Math.max(height, 1);
    // Fit the full mark at any aspect ratio, including narrow desktop columns.
    camera.position.z = Math.max(7.6, (2.05 / Math.max(camera.aspect,.2)) / Math.tan(THREE.MathUtils.degToRad(16.5)));
    camera.updateProjectionMatrix();
    if (!running || state.paused) render();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  function setRunning(value) {
    running = value && !document.hidden && !destroyed && contextValid;
    stats.running = running && !state.paused;
    host.dataset.running = String(stats.running);
    cancelAnimationFrame(frame);
    last = 0;
    if (running) render();
  }
  function contextLost(event) {
    event.preventDefault();
    contextValid = false;
    setRunning(false);
    onFailure?.();
  }
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  resize();
  return {
    state, stats,
    setRunning,
    setPointer(x, y) { if (!state.paused) { pointer.x = x; pointer.y = y; } },
    rotateBy(angle) { state.orientation += angle; if (!running || state.paused) render(); },
    resetOrientation() { state.orientation=0; pointer.x=0; pointer.y=0; if (!running || state.paused) render(); },
    setFinish(finish) {
      state.finish=finish;
      pieces.forEach((piece,index)=> {
        const source = finish==='chrome'?materials.metal:finish==='glass'&&index!==2?materials.glass:materials[elements[index].material];
        piece.material.copy(source);
        piece.material.needsUpdate = true;
      });
      if (!running || state.paused) render();
    },
    refresh() { if (!running || state.paused) render(); },
    dispose() {
      destroyed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      group.traverse(object => object.geometry?.dispose());
      pieces.forEach(piece => piece.material.dispose());
      Object.values(materials).forEach(material => material.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
