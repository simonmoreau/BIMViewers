import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';

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

  ngOnInit(): void {

    this.httpService.get('https://func-bim42-prod-fr-bimviewers.azurewebsites.net/api/Autodesk').subscribe(response => {
      console.log(response);
    });

    var options = {
      env: 'AutodeskProduction2',
      api: 'streamingV2_EU', // for models uploaded to EMEA change this option to 'streamingV2_EU'
      getAccessToken: function (onTokenReady: any) {
        var token =
          'eyJhbGciOiJSUzI1NiIsImtpZCI6IlhrUFpfSmhoXzlTYzNZS01oRERBZFBWeFowOF9SUzI1NiIsInBpLmF0bSI6ImFzc2MifQ.eyJzY29wZSI6WyJjb2RlOmFsbCIsImRhdGE6d3JpdGUiLCJkYXRhOnJlYWQiLCJidWNrZXQ6Y3JlYXRlIiwiYnVja2V0OmRlbGV0ZSIsImJ1Y2tldDpyZWFkIl0sImNsaWVudF9pZCI6ImNyQWZJRUk2MmZENnZpZHF0MFFmQmpqT0ZjMk1uREExVTNwOEtiNkJFQURhV1V1SCIsImlzcyI6Imh0dHBzOi8vZGV2ZWxvcGVyLmFwaS5hdXRvZGVzay5jb20iLCJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbSIsImp0aSI6InU1bndjaDhEa1o1QUNhdFpWTlBTMnRId1BoaUc3dWxyeXpKamNuR1kybm5MOHRqbFQ3eDdic25WS3lVVVVKcGEiLCJleHAiOjE3NDQyMzIxOTN9.h12DKr7qeGNcYpEJzs8846ZT0_LV3Qj750oCgdoV59W_EhLoqSjABN4jxPE1X76i1qFUNqzaBZGgKEqNJy5YPHVGbYAJK7TV38ZzASxx76khYMavopNsdSnP7xq1fdZw8TxiTnO0Uz50oqmipCM79HKX4a-KGNF2Yqxl61_xyXvkxNCodDtStRnjg-akrxfN7Vv8tvL7gJoWEaH5dVhCktFW65-ZIjI7lzvplcDqBqO_0bjq9xTmMQ8WAmdNkm2tWqwRuqXiulXp7v5-8M7oLVVXgPiV0_WkI0jFm_12x0ZMIzyVogo5WXwwnTdrROiiGH1qI2nPSnlJPRTbMCKUuw';
        var timeInSeconds = 3600; // Use value provided by APS Authentication (OAuth) API
        onTokenReady(token, timeInSeconds);
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
