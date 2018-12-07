import {NgModule} from '@angular/core';
import {ServersComponent} from './servers.component';
import {SharedModule} from '../../shared.module';
import {TableModule} from '@components/table/table.module';
import {ServersformComponent} from './serversform/serversform.component';
import {ServersformModule} from './serversform/serversform.module';

@NgModule({
  declarations: [ServersComponent],
  exports: [ServersComponent],
  imports: [SharedModule, TableModule, ServersformModule],
  entryComponents: [ServersformComponent]
})

export class ServersModule {

}
