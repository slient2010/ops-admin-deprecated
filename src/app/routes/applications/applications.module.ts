import { NgModule } from '@angular/core';
import { ApplicationsComponent } from './applications.component';
import {SharedModule} from '../../shared.module';
import {TableModule} from '@components/table/table.module';
import {ApplicationsformModule} from './applicationsform/applicationsform.module';
import {ApplicationsformComponent} from './applicationsform/applicationsform.component';
import { CreateappformComponent } from './createappform/createappform.component';

@NgModule({
  declarations: [ApplicationsComponent, CreateappformComponent],
  exports: [ApplicationsComponent],
  imports: [SharedModule, TableModule, ApplicationsformModule],
  entryComponents: [ApplicationsformComponent, CreateappformComponent]
})
export class ApplicationsModule { }
