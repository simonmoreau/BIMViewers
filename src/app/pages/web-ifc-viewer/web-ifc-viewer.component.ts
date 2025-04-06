import { Component, OnInit } from '@angular/core';
import * as OBC from '@thatopen/components/';
import * as THREE from 'three';

@Component({
  selector: 'app-web-ifc-viewer',
  standalone: false,
  templateUrl: './web-ifc-viewer.component.html',
  styleUrl: './web-ifc-viewer.component.scss',
})
export class WebIfcViewerComponent implements OnInit {
  ngOnInit(): void {
    const container = document.getElementById('container')!;
    const components = new OBC.Components();
    const worlds = components.get(OBC.Worlds);

    const world = worlds.create<
      OBC.SimpleScene,
      OBC.SimpleCamera,
      OBC.SimpleRenderer
    >();

    world.scene = new OBC.SimpleScene(components);
    world.renderer = new OBC.SimpleRenderer(components, container);
    world.camera = new OBC.SimpleCamera(components);

    components.init();
    world.scene.setup();

    const material = new THREE.MeshLambertMaterial({ color: "#6528D7" });
    const geometry = new THREE.BoxGeometry();
    const cube = new THREE.Mesh(geometry, material);
    world.scene.three.add(cube);
  }
}
