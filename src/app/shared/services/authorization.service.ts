/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { environment } from './../../../environments/environment';

import { Injectable } from '@angular/core';
import {
    BrowserAuthorizationCallbackHandler, BrowserAuthorizationClient,
    BrowserAuthorizationClientConfiguration
} from '@itwin/browser-authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private readonly _client: BrowserAuthorizationClient;
  private readonly _config: BrowserAuthorizationClientConfiguration;

  constructor() {
    this._config = environment.authorization;

  const authConfig: BrowserAuthorizationClientConfiguration = {
    authority: "https://ims.bentley.com",
    scope: environment.authorization.scope,
    clientId: environment.authorization.clientId,
    redirectUri: environment.authorization.redirectUri,
    postSignoutRedirectUri: environment.authorization.postSignoutRedirectUri,
    responseType: environment.authorization.responseType,
    noSilentSignInOnAppStartup: true
  };

    this._client = new BrowserAuthorizationClient(authConfig);
  }

  public async signIn() {
    await BrowserAuthorizationCallbackHandler.handleSigninCallback(
      this._config.redirectUri
    );
    return new Promise<boolean>((resolve, reject) => {
      this._client.onAccessTokenChanged.addOnce((token: string) => resolve(token !== ""));
      this._client.signIn().catch((err) => reject(err));
    });
  }

  public get client() {
    return this._client;
  }

  public get signedIn() {
    return this._client.hasSignedIn;
  }

}
