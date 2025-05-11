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

@Component({
  selector: 'app-itwin',
  standalone: false,
  templateUrl: './itwin.component.html',
  styleUrl: './itwin.component.scss',
})
export class ItwinComponent implements OnInit {
  constructor(private authService: AuthorizationService) {}

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
      ),
      mapLayerOptions: {
        BingMaps: {
          key: 'key',
          value: environment.map?.bingKey ?? '',
        },
      },
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
  public doSomethingToViewport(viewportProps: any) {

    
  }
}
