import { Injectable } from '@angular/core';
import { NHttpClinet } from '@core/utils/http.client';
import { TableFiled } from '@core/interfaces/table.interface';
import { BaseService } from '@core/utils/BaseRequest';
import { SessionStorageService } from '@core/storage/storage.module';

@Injectable()
export class ApplicationsService extends BaseService {
  constructor(http: NHttpClinet, private _storage: SessionStorageService) {
    super('applications', http);
  }

  /**
   * 获取列表表头
   * @returns {TableFiled[]}
   */
  getTableHeader(): TableFiled[] {
    return [
      {
        field: 'appname',
        text: '应用名称'
      },
      {
        field: 'version',
        text: '版本'
      },
      {
        field: 'stat',
        text: '应用状态'
      },
      {
        field: 'workerid',
        text: '所在服务器'
      },
      {
        field: 'created_time',
        text: '创建时间'
      },
      {
        text: '操作',
        type: 2
      }
    ];
  }

  getServerLists() {
    return new Promise((resolve, reject) => {
      this.http
        .get('http://localhost:20000/workers')
        // this.http.get('https://dev-devops.teyixing.com/appsByJson')
        .subscribe(result => {
          // console.log('hellorequest data:', result);
          resolve(result);
        });
    });
  }


  getApplicationsList(pageIndex, pageSize) {
    return new Promise((resolve, reject) => {
      this.http
        .get('http://localhost:20000/appsByJson')
        // this.http.get('https://dev-devops.teyixing.com/appsByJson')
        .subscribe(result => {
          // console.log('hellorequest data:', result);
          resolve(result);
        });
    });
  }

  submitdata(applists: any) {
    let action: string;
    console.log('submit.......data', applists);
    for (const i in applists) {
      if (i) {
        action = applists[i]['action'];
      }
    }

    // 操作字典， todo: 后续优化
    const actions: { [key: string]: string } = {
      createapp: 'http://localhost:20000/createapp',
      start: 'http://localhost:20000/appStart',
      stop: 'http://localhost:20000/appStop'
    };

    if (action) {
      const apiUrl = actions[action];
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // post 数据
          // const req = this.http.post('http://jsonplaceholder.typicode.com/posts', {
          const req = this.http
            .post(apiUrl, {
              applists
            })
            .subscribe(
              res => {
                console.log(res);
                resolve(true);
                return true;
              },
              err => {
                console.log(err);
                console.log('Error occured');
                reject(false);
                return false;
              }
            );
        }, 2000);
      });
    }
  }
}
