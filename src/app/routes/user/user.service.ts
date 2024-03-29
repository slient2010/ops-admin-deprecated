import {Injectable} from '@angular/core';
import {NHttpClinet} from '@core/utils/http.client';
import {TableFiled} from '@core/interfaces/table.interface';
import {BaseService} from '@core/utils/BaseRequest';

@Injectable()
export class UserService extends BaseService {

  constructor(http: NHttpClinet) {
    super('user', http);
  }

  /**
   * 获取列表表头
   * @returns {TableFiled[]}
   */
  getTableHeader(): TableFiled[] {
    return [
      {
        field: 'id',
        text: 'Id'
      },
      {
        field: 'Hostname',
        text: '主机名',
        type: 3
      },
      {
        field: 'Name',
        text: '用户名'
      },
      {
        field: 'AssetId',
        text: '昵称'
      },
      {
        field: 'phone',
        text: '电话号码'
      },
      {
        field: 'age',
        text: '年龄'
      },
      {
        field: 'address',
        text: '地址'
      },
      {
        field: 'isMale',
        text: '男',
        type: 4
      },
      {
        field: 'email',
        text: 'Email'
      },
      {
        field: 'CreatedAt',
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
  getUserList(pageIndex, pageSize) {
    return new Promise((resolve, reject) => {
      // this.http.get('https://www.easy-mock.com/mock/5a011b579d3ceb4a354379db/user')
	 this.http.get('http://172.17.0.3/user.json')
	 // 获取服务器信息
         // this.http.get('https://cmdb.teyixing.com/serverlist')
        .subscribe(result => {
          console.log("request data:", result);
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
