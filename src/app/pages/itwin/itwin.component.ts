import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';

import {
  BentleyCloudRpcManager,
  IModelReadRpcInterface,
  IModelTileRpcInterface,
} from '@itwin/core-common';

import { AuthorizationService } from './../../shared/services/authorization.service';
import { IModelApp } from '@itwin/core-frontend';
import { FrontendIModelsAccess } from '@itwin/imodels-access-frontend';
import { IModelsClient } from '@itwin/imodels-client-management';
import { PresentationRpcInterface } from '@itwin/presentation-common';
import type { ViewportProps } from './viewport-props';
import { ToolsService } from './../../shared/services/tools.service';
import { SelectionLoggerService } from './../../shared/services/selection-logger.service';

@Component({
  selector: 'app-itwin',
  standalone: false,
  templateUrl: './itwin.component.html',
  styleUrl: './itwin.component.scss',
})
export class ItwinComponent implements OnInit {
  constructor(
        private toolsService: ToolsService,
    private selectionLoggerService: SelectionLoggerService,
    private authService: AuthorizationService) {}

  public initialized = false;
  public viewportId = 'myFirstViewportId';

  ngOnInit(): void {
    this._initialize();
  }

  /** initialize iTwin services */
  private async _initialize() {
    if (!this.authService.signedIn) {
      await this.authService.signIn();
    }
    // for development purposes only
    // assert(
    //   this.authService.signedIn,
    //   'User must sign in before initializing IModelApp'
    // );
    // IModelApp.startup must be called before loading any imodel or viewport
    await IModelApp.startup({
      authorizationClient: this.authService.client,
      rpcInterfaces: [IModelReadRpcInterface],
      hubAccess: new FrontendIModelsAccess(
        new IModelsClient({
          api: {
            baseUrl: `https://api.bentley.com/imodels`,
          },
        })
      )
    });
    BentleyCloudRpcManager.initializeClient(
      {
        uriPrefix: 'https://api.bentley.com',
        info: { title: "imodel/rpc", version: "v4" },
      },
      [IModelReadRpcInterface, IModelTileRpcInterface, PresentationRpcInterface]
    );
    this.initialized = true;
  }

  /**
   * Viewport will emit an event when it is done loading.
   *  Use the id you provided (important only if you have more than one viewport)
   *  to add tools, extensions, etc.
   */
  public doSomethingToViewport(viewportProps: ViewportProps) {
    if (viewportProps.viewportId === this.viewportId) {
      // adds basic navigation tools to the viewport
      this.toolsService.addToolbar(viewportProps.viewportDiv);
      // logs element properties to the console when selected
      
      viewportProps.imodelConnection.selectionSet.onChanged.addListener((evt) => {
        this.selectionLoggerService.onSelectionChanged(viewportProps.imodelConnection, evt);
      });
    }
  }
}
