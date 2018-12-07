import { Injectable } from '@angular/core';
import { NHttpClinet } from '@core/utils/http.client';
import { TableFiled } from '@core/interfaces/table.interface';
import { BaseService } from '@core/utils/BaseRequest';
import { SessionStorageService } from '@core/storage/storage.module';


@Injectable()
export class CreateappformService extends BaseService {

  constructor(http: NHttpClinet, private _storage: SessionStorageService) {
    super('createappform', http);
  }

  /**
   * 获取列表表头
   * @returns {TableFiled[]}
   */

  getTableHeader(): TableFiled[] {
    return [
      {
        field: 'name',
        text: '应用名称'
      },
      {
        field: 'Version',
        text: '版本'
      },
      {
        field: 'Stat',
        text: '应用状态'
      },
      {
        field: 'Workerid',
        text: '所在服务器'
      },
      {
        field: 'Time',
        text: '创建时间'
      },
      {
        text: '操作',
        type: 2
      }
    ];
  }

}
