/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
// REPLACE WITH YOUR CLIENT FROM https://developer.bentley.com/register/

import { BrowserAuthorizationClientConfiguration } from "@itwin/browser-authorization";

export interface EnvironmentOptions {
  production: boolean;
  authorization: BrowserAuthorizationClientConfiguration;
  iTwinId: string;
  iModelId: string;
  map: {
    bingKey: string;
  };
}

export const environment = {
  production: false,
  authorization: {
    clientId: "spa-Ii1yu8WkvyaWssDPls95o6CCN",
    scope: "itwin-platform",
    redirectUri: "http://localhost:4200/itwin", // please note trailing "/" matters between this and app registration config
    postSignoutRedirectUri: "http://localhost:4200/itwin",
    responseType: "code",
    authority: "https://ims.bentley.com"
  },
  iTwinId: "935bac8c-7bc6-4eac-96fe-76e62cf930be",
  iModelId: "ef6c05ce-12d8-415e-a8bb-695595d4153e"
};