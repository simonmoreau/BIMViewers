import { Component, OnInit } from '@angular/core';
import {
  Viewer,
  DefaultViewerParams,
  SpeckleLoader,
  UrlHelper,
} from '@speckle/viewer';
import { CameraController, SelectionExtension } from '@speckle/viewer';

@Component({
  selector: 'app-speckle',
  standalone: false,
  templateUrl: './speckle.component.html',
  styleUrl: './speckle.component.scss',
})
export class SpeckleComponent implements OnInit {
  async ngOnInit(): Promise<void> {
    const container: HTMLElement = document.getElementById(
      'viewer-3d'
    ) as HTMLElement;

    /** Configure the viewer params */
    const params = DefaultViewerParams;

    /** Create Viewer instance */
    const viewer = new Viewer(container, params);
    /** Initialise the viewer */
    await viewer.init();

    /** Add the stock camera controller extension */
    viewer.createExtension(CameraController);
    /** Add the selection extension for extra interactivity */
    viewer.createExtension(SelectionExtension);

    /** Create a loader for the speckle stream */
    const urls = await UrlHelper.getResourceUrls(
      'https://app.speckle.systems/projects/24aa6f1baa/models/b80aec158e'
    );
    for (const url of urls) {
      const loader = new SpeckleLoader(viewer.getWorldTree(), url, '');
      /** Load the speckle data */
      await viewer.loadObject(loader, true);
    }
  }
}
