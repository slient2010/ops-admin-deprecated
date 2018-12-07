import {NgModule} from '@angular/core';
import {ServersformComponent} from './serversform.component';
import {SharedModule} from '../../../shared.module';

@NgModule({
  declarations: [ServersformComponent],
  exports: [ServersformComponent],
  imports: [SharedModule]
})

export class ServersformModule {

}
