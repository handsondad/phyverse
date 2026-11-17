import * as THREE from 'three';
import { mountDuo, type DuoKit, type DuoStage } from '../series/duo-stage';

/** 物理奇遇记的小星球：在系列同一颗星球上，摆一台牛顿摆、一块马蹄形磁铁、一盏小灯泡和一块三棱镜，头顶飘着土星、原子和一颗小卫星。 */

function ball(kit: DuoKit, color: string, r: number, at: [number, number, number]): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 14), kit.toon(color));
  mesh.position.set(...at);
  return mesh;
}

function rod(kit: DuoKit, color: string, from: THREE.Vector3, to: THREE.Vector3, r = 0.02): THREE.Mesh {
  const length = from.distanceTo(to);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, length, 8), kit.toon(color));
  mesh.position.copy(from).lerp(to, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), to.clone().sub(from).normalize());
  return mesh;
}

/** 牛顿摆：两头的球轮流荡起来，中间的不动 */
function cradle(kit: DuoKit): { group: THREE.Group; ends: THREE.Group[] } {
  const group = new THREE.Group();
  const frame = '#8b7a5c';
  const [w, h] = [0.5, 0.5];
  for (const x of [-w / 2, w / 2]) group.add(rod(kit, frame, new THREE.Vector3(x, 0, 0), new THREE.Vector3(x, h, 0), 0.018));
  group.add(rod(kit, frame, new THREE.Vector3(-w / 2, h, 0), new THREE.Vector3(w / 2, h, 0), 0.018));
  const base = new THREE.Mesh(new THREE.BoxGeometry(w + 0.12, 0.04, 0.18), kit.toon('#c8955b'));
  group.add(base);
  const ends: THREE.Group[] = [];
  [-0.16, -0.08, 0, 0.08, 0.16].forEach((x, i) => {
    const hanger = new THREE.Group();
    hanger.position.set(x, h, 0);
    hanger.add(rod(kit, '#d8cfc2', new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -0.3, 0), 0.006));
    hanger.add(ball(kit, '#c9d3dd', 0.04, [0, -0.33, 0]));
    group.add(hanger);
    if (i === 0 || i === 4) ends.push(hanger);
  });
  return { group, ends };
}

function magnet(kit: DuoKit): THREE.Group {
  const group = new THREE.Group();
  const arc = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.05, 10, 24, Math.PI), kit.toon('#e5484d'));
  arc.position.y = 0.32;
  group.add(arc);
  for (const [side, color] of [[-1, '#e5484d'], [1, '#3d7bff']] as const) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.22, 12), kit.toon(color));
    leg.position.set(side * 0.14, 0.21, 0);
    const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.052, 0.07, 12), kit.toon('#e8e3da'));
    tip.position.set(side * 0.14, 0.07, 0);
    group.add(leg, tip);
  }
  return group;
}

function bulb(kit: DuoKit): { group: THREE.Group; glow: THREE.Mesh } {
  const group = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.1, 14), kit.toon('#9aa3ad'));
  base.position.y = 0.05;
  const glass = ball(kit, '#fff3b0', 0.13, [0, 0.21, 0]);
  const halo = new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 12), new THREE.MeshBasicMaterial({ color: '#ffe066', transparent: true, opacity: 0.25 }));
  halo.position.y = 0.21;
  group.add(base, glass, halo);
  return { group, glow: halo };
}

function prism(kit: DuoKit): THREE.Group {
  const group = new THREE.Group();
  const glass = kit.toon('#dff1fb');
  glass.transparent = true;
  glass.opacity = 0.75;
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.24, 3), glass);
  body.rotation.z = Math.PI / 2;
  body.position.y = 0.14;
  group.add(body);
  ['#e03131', '#f2c200', '#2f9e44', '#1c7ed6', '#9c36b5'].forEach((color, i) => {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.012, 0.03), kit.toon(color));
    beam.position.set(0.3, 0.1 - i * 0.022, 0);
    beam.rotation.z = -0.15 - i * 0.05;
    group.add(beam);
  });
  return group;
}

function saturn(kit: DuoKit): THREE.Group {
  const group = new THREE.Group();
  group.add(ball(kit, '#f2c879', 0.2, [0, 0, 0]));
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.035, 6, 48), kit.toon('#d9a35b'));
  ring.rotation.x = Math.PI / 2.3;
  group.add(ring);
  return group;
}

function atom(kit: DuoKit): { group: THREE.Group; electrons: { mesh: THREE.Mesh; phase: number }[] } {
  const group = new THREE.Group();
  group.add(ball(kit, '#ffb347', 0.1, [0, 0, 0]));
  const ringMat = kit.toon('#6cc4ff');
  const rings = [0, 1, 2].map(i => {
    const ring = new THREE.Group();
    ring.rotation.set(Math.PI / 2 + (i - 1) * 0.9, 0, (i - 1) * 0.6);
    ring.add(new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.012, 6, 48), ringMat));
    group.add(ring);
    return ring;
  });
  const electrons = rings.map((ring, i) => {
    const mesh = ball(kit, '#3d7bff', 0.045, [0.34, 0, 0]);
    ring.add(mesh);
    return { mesh, phase: (i * Math.PI * 2) / 3 };
  });
  return { group, electrons };
}

function satellite(kit: DuoKit): THREE.Group {
  const group = new THREE.Group();
  group.add(new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.08), kit.toon('#d8dee6')));
  for (const side of [-1, 1]) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.01, 0.07), kit.toon('#3553a6'));
    panel.position.x = side * 0.12;
    group.add(panel);
  }
  return group;
}

function decorate(kit: DuoKit): void {
  // 镜头里只看得见星球顶上窄窄一圈，道具都挨着两人摆
  const newton = cradle(kit);
  newton.group.scale.setScalar(1.3);
  kit.plant(newton.group, 1.15, -0.2);
  const horseshoe = magnet(kit);
  horseshoe.scale.setScalar(1.15);
  kit.plant(horseshoe, -1.25, -0.05);
  const lamp = bulb(kit);
  lamp.group.scale.setScalar(1.2);
  kit.plant(lamp.group, -1.6, -0.7);
  kit.plant(prism(kit), -0.95, 0.55);
  kit.plant(ball(kit, '#ff9f43', 0.09, [0, 0.09, 0]), 1.0, 0.5);

  const orbit = atom(kit);
  const floaters = [
    { object: saturn(kit), at: new THREE.Vector3(-1.9, 1.95, -1.1), spin: 0.35 },
    { object: orbit.group, at: new THREE.Vector3(1.35, 2.45, -1.8), spin: -0.3 },
  ];
  floaters.forEach(({ object, at }) => {
    object.position.copy(at);
    kit.scene.add(object);
  });
  const sat = satellite(kit);
  const satCenter = new THREE.Vector3(-0.15, 2.7, -2.4);
  kit.scene.add(sat);

  kit.onFrame((t, dt) => {
    floaters.forEach(({ object, at, spin }, i) => {
      object.rotation.y += dt * spin;
      object.position.y = at.y + Math.sin(t * 1.1 + i * 2) * 0.08;
    });
    for (const electron of orbit.electrons) {
      electron.phase += dt * 2.4;
      electron.mesh.position.set(Math.cos(electron.phase) * 0.34, Math.sin(electron.phase) * 0.34, 0);
    }
    const swing = Math.sin(t * 3.2);
    newton.ends[0].rotation.z = -Math.max(swing, 0) * 0.6;
    newton.ends[1].rotation.z = Math.max(-swing, 0) * 0.6;
    (lamp.glow.material as THREE.MeshBasicMaterial).opacity = 0.2 + 0.12 * (0.5 + 0.5 * Math.sin(t * 2.4));
    sat.position.set(satCenter.x + Math.cos(t * 0.6) * 0.55, satCenter.y + Math.sin(t * 0.6) * 0.18, satCenter.z + Math.sin(t * 0.6) * 0.3);
    sat.rotation.y = t * 0.6;
  });
}

export function mountPhyPlanet(host: HTMLElement, onTap: () => void): Promise<DuoStage> {
  return mountDuo(host, { label: '小念和爸爸站在物理小星球上，旁边的牛顿摆在来回敲；点他们会接着聊', decorate, onTap });
}
