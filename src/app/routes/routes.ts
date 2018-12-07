import {ModuleWithProviders} from '@angular/core';

import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from '../routes/home/home.component';
import {LoginComponent} from '../routes/login/login.component';
import {DashboardComponent} from '../routes/dashboard/dashboard.component';
import {UserComponent} from '../routes/user/user.component';
import {ServersComponent } from '../routes/servers/servers.component';
import {CanAuthProvide} from '@core/services/auth.service';
import {ChartsComponent} from './charts/charts.component';
import {ApplicationsComponent} from './applications/applications.component';
import {PkginfoComponent} from './pkginfo/pkginfo.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent, canLoad: [CanAuthProvide]},
  {
    path: '', component: HomeComponent, canActivate: [CanAuthProvide],
    children: [
      {
        path: 'dashboard', component: DashboardComponent, canActivate: [CanAuthProvide],
        data: {
          breadcrumb: '控制台'
        }
      },
      {
        path: 'user', component: UserComponent, canActivate: [CanAuthProvide],
        data: {
          breadcrumb: '用户管理'
        }
      },
      {
        path: 'pkglists', component: PkginfoComponent, canActivate: [CanAuthProvide],
        data: {
          breadcrumb: '应用安装包'
        }
      },
      {
        path: 'apps', component: ApplicationsComponent, canActivate: [CanAuthProvide],
        data: {
          breadcrumb: '应用管理'
        }
      },
      // todo: 完善主机管理增删改功能
      {
        path: 'servers', component: ServersComponent , canActivate: [CanAuthProvide],
        data: {
          breadcrumb: '服务器管理'
        }
      },
      // {path: 'charts', component: ChartsComponent, canActivate: [CanAuthProvide]},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];

