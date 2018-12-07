import { NgModule } from '@angular/core';
import { ApplicationsformComponent } from './applicationsform.component';
import {SharedModule} from '../../../shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [ApplicationsformComponent],
  exports: [ApplicationsformComponent]
})
export class ApplicationsformModule { }
