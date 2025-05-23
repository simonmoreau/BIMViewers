import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WebIfcViewerComponent } from './pages/web-ifc-viewer/web-ifc-viewer.component';
import { CatendaComponent } from './pages/catenda/catenda.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { AutodeskComponent } from './pages/autodesk/autodesk.component';
import { SpeckleComponent } from './pages/speckle/speckle.component';
import { BimDataComponent } from './pages/bim-data/bim-data.component';
import { XbimComponent } from './pages/xbim/xbim.component';
import { ItwinComponent } from './pages/itwin/itwin.component';

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'web-ifc-viewer',
    component: WebIfcViewerComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'catenda',
    component: CatendaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'autodesk',
    component: AutodeskComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'speckle',
    component: SpeckleComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'bim-data',
    component: BimDataComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'xbim',
    component: XbimComponent,
    canActivate: [ AuthGuardService ]
  },
    {
    path: 'itwin',
    component: ItwinComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent
  ]
})
export class AppRoutingModule { }
