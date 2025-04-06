import { Component, OnInit } from '@angular/core';

declare var bimsync: any;

@Component({
  selector: 'app-catenda',
  standalone: false,
  templateUrl: './catenda.component.html',
  styleUrl: './catenda.component.scss'
})
export class CatendaComponent implements OnInit {
  ngOnInit(): void {
    bimsync.setOnLoadCallback(this.onViewer3dLoad);
    bimsync.load();
  }

  private onViewer3dLoad() {
    const projectId = "79d3bb6f8fbe49739311d80bd691e81b";
    const token = "5d32595610c44bb5b3e987db5a854bdd";

    const tokenUrl = `https://api.catenda.com/v2/projects/${projectId}/viewer3d/data?token=${token}`;

    const viewer3dOptions = {
      textRenderMode: "dom",
    };

    const modelIds = ["be8d69755422404d9dac5860b62e0082"];
    

    const viewer3dElement = document.getElementById("viewer-3d");
    const viewer3d = new bimsync.viewer3d.Viewer3D(viewer3dElement, viewer3dOptions);
    const type = "bim";

    viewer3d.loadModelsFromToken(tokenUrl).then(() => {
      const modelInfos = viewer3d.getModels();
      const hiddenModels = modelInfos.map((modelInfo: any) => {
        viewer3d.hideModel(modelInfo.id, type);
      });

      const modelId = "be8d69755422404d9dac5860b62e0082";
      viewer3d.showModel(modelId, type);
    });
  }

}
