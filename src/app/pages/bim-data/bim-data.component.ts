import { Component, OnInit } from '@angular/core';
import makeBIMDataViewer from '@bimdata/viewer';
import { HttpService } from '../../shared/services/http.service';
import { ICommonToken } from '../../shared/interfaces/common-token.model';

@Component({
  selector: 'app-bim-data',
  standalone: false,
  templateUrl: './bim-data.component.html',
  styleUrl: './bim-data.component.scss',
})
export class BimDataComponent implements OnInit {
  private _httpService: HttpService;

  constructor(httpService: HttpService) {
    this._httpService = httpService;
  }

  async ngOnInit() {
    let token = await this._httpService.get<ICommonToken>('BIMData');

    const bimdataViewer = makeBIMDataViewer({
      api: {
        // demo identifications
        modelIds: [1385762],
        cloudId: 31760,
        projectId: 1407938,
        accessToken: token.accessToken,
      },
    });

    bimdataViewer.mount('#viewer-3d');
  }
}
