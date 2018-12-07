import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardModule} from './dashboard/dashboard.module';
import {HomeModule} from './home/home.module';
import {UserModule} from './user/user.module';
import {ServersModule} from './servers/servers.module';
import {LoginModule} from './login/login.module';
import {routes} from './routes';
import {ChartsModule} from './charts/charts.module';
import {ApplicationsModule} from './applications/applications.module';
import {PkginfoModule} from './pkginfo/pkginfo.module';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  exports: [
    DashboardModule,
    HomeModule,
    UserModule,
    ServersModule,
    LoginModule,
    ChartsModule,
    ApplicationsModule,
    PkginfoModule
  ],
})

export class RoutesModule {

}
