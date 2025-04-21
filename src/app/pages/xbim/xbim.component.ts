import { Component, OnInit } from '@angular/core';
import { Viewer, State } from '@dangl/xbim-viewer';

@Component({
  selector: 'app-xbim',
  standalone: false,
  templateUrl: './xbim.component.html',
  styleUrl: './xbim.component.scss'
})
export class XbimComponent implements OnInit {
  constructor() {}

  private viewer: Viewer | undefined;
  loadingFile: boolean = true;

  ngOnInit(): void {
    const modelUrl = 'https://stbim42prodfrbimviewer.blob.core.windows.net/models/snowdon-towers-sample-structural.wexBIM';
    this.viewer = new Viewer('viewer');
    this.viewer.start();
    this.viewer.on('loaded',
        () => {
            this.loadingFile = false;
        });
    this.viewer.load(modelUrl, 'model');
  }

}
