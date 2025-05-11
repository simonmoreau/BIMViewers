import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DxHttpModule } from 'devextreme-angular/http';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { WebIfcViewerComponent } from './pages/web-ifc-viewer/web-ifc-viewer.component';
import { CatendaComponent } from './pages/catenda/catenda.component';
import { AutodeskComponent } from './pages/autodesk/autodesk.component';
import { SpeckleComponent } from './pages/speckle/speckle.component';
import { BimDataComponent } from './pages/bim-data/bim-data.component';
import { XbimComponent } from './pages/xbim/xbim.component';
import { ItwinComponent } from './pages/itwin/itwin.component';
import { ViewportDirective } from './pages/itwin/viewport.directive';

@NgModule({
  declarations: [
    AppComponent,
    WebIfcViewerComponent,
    CatendaComponent,
    AutodeskComponent,
    SpeckleComponent,
    BimDataComponent,
    XbimComponent,
    ItwinComponent,
    ViewportDirective
  ],
  imports: [
    BrowserModule,
    DxHttpModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule 
  ],
  providers: [
    provideHttpClient(),
    AuthService,
    ScreenService,
    AppInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
