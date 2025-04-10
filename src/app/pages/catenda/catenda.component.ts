import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { ICommonToken } from '../../shared/interfaces/common-token.model';

declare var bimsync: any;

@Component({
  selector: 'app-catenda',
  standalone: false,
  templateUrl: './catenda.component.html',
  styleUrl: './catenda.component.scss'
})
export class CatendaComponent implements OnInit, OnDestroy {

  private viewer3d: any | null;
  private viewer3dElement: HTMLElement | null
  private httpService: HttpService;
  
  
    constructor(httpService: HttpService) {
      this.httpService = httpService;
      this.viewer3d = null;
      this.viewer3dElement = null;
    }

    ngOnDestroy(): void {
      this.viewer3d = null;
      this.viewer3dElement = null;

    }

  ngOnInit(): void {
    bimsync.setOnLoadCallback(() => this.onViewer3dLoad(this));
    bimsync.load();
  }

  private async onViewer3dLoad(component: CatendaComponent) {
    const projectId = "79d3bb6f8fbe49739311d80bd691e81b";
    // const token = "53194743d0cd48b0a5c17a1f1b36af0e";

    let token = await component.httpService.get<ICommonToken>('Catenda')

    const tokenUrl = `https://api.catenda.com/v2/projects/${projectId}/viewer3d/data?token=${token.accessToken}`;

    const viewer3dOptions = {
      textRenderMode: "dom",
    };

    const modelIds = ["be8d69755422404d9dac5860b62e0082"];
    
    if (component.viewer3dElement != null) return;

    this.viewer3dElement= document.getElementById("viewer-3d");
    this.viewer3d = new bimsync.viewer3d.Viewer3D(this.viewer3dElement, viewer3dOptions);
    const type = "bim";

    this.viewer3d.loadModelsFromToken(tokenUrl).then(() => {
      const modelInfos = this.viewer3d.getModels();
      const hiddenModels = modelInfos.map((modelInfo: any) => {
        this.viewer3d.hideModel(modelInfo.id, type);
      });

      const modelId = "be8d69755422404d9dac5860b62e0082";
      this.viewer3d.showModel(modelId, type);
    });
  }

}
