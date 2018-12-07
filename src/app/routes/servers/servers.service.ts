import {Injectable} from '@angular/core';
import {NHttpClinet} from '@core/utils/http.client';
import {TableFiled} from '@core/interfaces/table.interface';
import {BaseService} from '@core/utils/BaseRequest';

@Injectable()
export class ServersService extends BaseService {

  constructor(http: NHttpClinet) {
    super('servers', http);
  }

  /**
   * 获取列表表头
   * @returns {TableFiled[]}
   */
  getTableHeader(): TableFiled[] {
    return [
      {
        field: 'Id',
        text: 'Id'
      },
      {
        field: 'Path',
        text: '应用目录',
      },
      {
        field: 'AppCount',
        text: '应用数量'
      },
      {
        field: 'AppNames',
        text: '应用信息'
      },
      {
        field: 'Cpu',
        text: 'CPU使用率'
      },
      {
        field: 'Mem',
        text: '内存使用率'
      },
      {
        field: 'Disk',
        text: '磁盘使用率'
      },
      {
        field: 'Stat',
        text: '连接状态'
      },
      {
        field: 'FirstRegTime',
        text: '创建时间'
      },
      {
        text: '操作',
        type: 2
      }
    ]
      ;
  }

  /**
   * 获取列表数据
   * @param pageIndex
   * @param pageSize
   * @returns {Promise<any>}
   */
  // getServersList(pageIndex, pageSize) {
  //   return new Promise((resolve, reject) => {
	 // // 获取服务器信息
  //        // this.http.get('https://cmdb.teyixing.com/serverlist')
	    // this.http.get('http://localhost:20000/appsByJson')
  //       .subscribe(result => {
		// console.log("request data:", result);
  //         resolve(result);
  //       });
  //   });
  // }
  getServersList(pageIndex, pageSize) {
    return new Promise((resolve, reject) => {
	    // this.http.get('http://localhost:20000/workers')
      this.http.get('http://localhost:20000/workers')
	    // this.http.get('https://dev-devops.teyixing.com/workers')
        .subscribe(result => {
          console.log('request data:', result);
          resolve(result);
        });
    });
  }

  getCityData() {
    return [{
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
          value: 'xihu',
          label: 'West Lake',
          isLeaf: true
        }],
      }, {
        value: 'ningbo',
        label: 'Ningbo',
        isLeaf: true
      }],
    }, {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
          value: 'zhonghuamen',
          label: 'Zhong Hua Men',
          isLeaf: true
        }],
      }],
    }];
  }
}
