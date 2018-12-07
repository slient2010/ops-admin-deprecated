import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from '@components/table/table.module';
import { PkginfoComponent } from './pkginfo.component';

@NgModule({
  declarations: [PkginfoComponent],
  imports: [
    CommonModule,
    TableModule
  ],
  exports: [PkginfoComponent]
})
export class PkginfoModule { }
