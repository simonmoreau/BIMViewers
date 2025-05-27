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
  async ngOnInit() {
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

    await this.loadIfc(components, world);
  }

  private async loadIfc(components: OBC.Components, world: OBC.SimpleWorld<OBC.SimpleScene, OBC.SimpleCamera, OBC.SimpleRenderer>) {
    const fragments = new OBC.FragmentsManager(components);
    const fragFile = await fetch(
      "school_str.frag",
    );

    const data = await fragFile.arrayBuffer();
    const buffer = new Uint8Array(data);
    const model = fragments.load(buffer);
    world.scene.three.add(model);
  }
}
