import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { ICommonToken } from '../../shared/interfaces/common-token.model';

@Component({
  selector: 'app-autodesk',
  standalone: false,
  templateUrl: './autodesk.component.html',
  styleUrl: './autodesk.component.scss',
})
export class AutodeskComponent implements OnInit, OnDestroy {
  viewer: Autodesk.Viewing.GuiViewer3D | null;
  private httpService: HttpService;
  
  constructor(httpService: HttpService) {
    this.httpService = httpService;
    this.viewer = null;
  }

  ngOnDestroy(): void {
    this.viewer?.finish();
    this.viewer = null;
    Autodesk.Viewing.shutdown();
  }

  async ngOnInit(): Promise<void> {

    let token = await this.httpService.get<ICommonToken>('Autodesk')


    var options = {
      env: 'AutodeskProduction2',
      api: 'streamingV2_EU', // for models uploaded to EMEA change this option to 'streamingV2_EU'
      getAccessToken: function (onTokenReady: any) {
        var timeInSeconds = 3600; // Use value provided by APS Authentication (OAuth) API
        onTokenReady(token.accessToken, timeInSeconds);
      },
    };

    Autodesk.Viewing.Initializer(options, () => this.InitializeViewer(this));
  }

  InitializeViewer(component: AutodeskComponent) {
    var htmlDiv = document.getElementById('forgeViewer');
    if (!htmlDiv) {
      console.error('Failed to find HTML div element for Autodesk Viewer.');
      return;
    }
    htmlDiv = htmlDiv as HTMLElement;
    component.viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv);
    var startedCode = component.viewer.start();
    if (startedCode > 0) {
      console.error('Failed to create a Viewer: WebGL not supported.');
      return;
    }

    console.log('Initialization complete, loading a model next...');

    var documentId =
      'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YmltNDItYXV0b2Rlc2stdmlld2VyL2Fwc2JvdDdlNWNmZmQ2LTk3YzItNDBmNy1hYTFhLTJlOGRhYzIyNDc5OQ';
    Autodesk.Viewing.Document.load(
      documentId,
      (viewerDocument: Autodesk.Viewing.Document) => component.OnDocumentLoadSuccess(viewerDocument, component),
      component.OnDocumentLoadFailure
    );
  }

  OnDocumentLoadSuccess(viewerDocument: Autodesk.Viewing.Document, component: AutodeskComponent) {
    // viewerDocument is an instance of Autodesk.Viewing.Document
    console.log(viewerDocument);

    var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
    component.viewer?.loadDocumentNode(viewerDocument, defaultModel);
  }

  OnDocumentLoadFailure(
    errorCode: Autodesk.Viewing.ErrorCodes,
    errorMsg: string,
    messages: any[]
  ) {
    console.error('Failed fetching Forge manifest');
  }
}
