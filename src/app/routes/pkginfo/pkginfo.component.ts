import { Component, OnInit } from '@angular/core';
import {PkginfoService} from './pkginfo.service';
import { GridComponent } from '@core/grid.component';

@Component({
  selector: 'app-pkginfo',
  templateUrl: './pkginfo.component.html',
  styleUrls: ['./pkginfo.component.css'],
  providers: [PkginfoService]
})
export class PkginfoComponent extends GridComponent implements OnInit {

  constructor(
    private pkginfoService: PkginfoService
  ) {
    super(pkginfoService);
  }

  ngOnInit() {
    this.getData();
  }

  getData = () => {
    this.setLoading(true);
    this.pkginfoService
    .getPkgList(this.current, this.pageSize)
    .then((result: any) => {
        const { data, total } = result;
        this.setTableData(data.pkglists);
        this.setTotal(total);
        this.setLoading(false);

    });
  }

}
