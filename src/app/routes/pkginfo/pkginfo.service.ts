import { Injectable } from '@angular/core';
import { NHttpClinet } from '@core/utils/http.client';
import { TableFiled } from '@core/interfaces/table.interface';
import { BaseService } from '@core/utils/BaseRequest';
import { SessionStorageService } from '@core/storage/storage.module';

@Injectable()
export class PkginfoService extends BaseService {
  constructor(http: NHttpClinet, private _storage: SessionStorageService) {
    super('pkginfo', http);
  }
  /**
   * 获取列表表头
   * @returns {TableFiled[]}
   */
  getTableHeader(): TableFiled[] {
    return [
      {
        field: 'name',
        text: '名称'
      }, {
        field: 'version',
        text: '版本'
      }, {
        field: 'environment',
        text: '打包环境'
      }, {
        field: 'update_time',
        text: '创建时间'
      }
    ];
  }

  getPkgList(pageIndex, pageSize) {
    return new Promise((resolve, reject) => {
      this.http
        .get('http://localhost:20000/pkglists')
        .subscribe(result => {
          resolve(result);
        });
    });
  }
}
