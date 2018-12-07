import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ApplicationsService } from './applications.service';
import { ApplicationsformComponent } from './applicationsform/applicationsform.component';
import { CreateappformComponent } from './createappform/createappform.component';
import { SearchParams } from '@core/interfaces/table.interface';
import { GridComponent } from '@core/grid.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.less'],
  providers: [ApplicationsService]
})
export class ApplicationsComponent extends GridComponent implements OnInit {
  /**
   * 列表搜索数据模型
   */
  searchParmas: SearchParams = {
    params: {
      options: []
    },
    values: {
      search_1: '',
      search_2: '',
      startDate: '',
      endDate: ''
    }
  };

  constructor(
    private applicationService: ApplicationsService,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {
    super(applicationService);
    // this.searchParmas.params.options = this.applicationService.getCityData();
    /**
     * 列表操作按钮
     */
    this.setGridView('operations', [
      {
        text: '开启服务',
        event: appname => {
          this.startApp(appname);
        }
      },
      {
        text: '关闭服务',
        event: appname => {
          this.stopApp(appname);
        }
      }
    ]);
  }

  ngOnInit() {
    this.getData();
  }

  /**
   * 获取列表数据
   * @param {number} event
   */
  getData = (event?: number) => {
    this.setLoading(true);
    this.applicationService
      .getApplicationsList(event || this.current, this.pageSize)
      .then((result: any) => {
        const { data, total } = result;
        this.setTableData(data);
        this.setTotal(total);
        this.setLoading(false);
      });
  }

 /*
  * 创建应用
  * @param null
  */
  createApp() {
    const self = this;
    // self.getPkgDatas();
    const subscription = this.modalService.open({
      title: '新建应用',
      content: CreateappformComponent,
      footer: false,
      onOk() {
        // 刷新数据
        self.getData();
      },
      onCancel() {
        // 消息提醒
        // alert('');
      },
      // 向子组件传递的参数
      componentParams: {
        // 服务器信息
        // app信息
        action: 'createapp'
      }
    });
    subscription.subscribe(result => {
      // if (result === 'ok') {
      this.getData();
      // }
    });

  }

  /**
   * 开启服务
   * @param {string} appname
   */
  startApp(appname?: string) {
    const self = this;
    // 更新数据
    const subscription = this.modalService.open({
      title: '开启应用',
      // 显示弹窗内容
      content: ApplicationsformComponent,
      footer: false,
      onOk() {
        // 刷新数据
        self.getData();
      },
      onCancel() {
        // 消息提醒
        // alert('');
      },
      // 向子组件传递的参数
      componentParams: {
        appname: appname,
        action: 'start'
      }
    });
    subscription.subscribe(result => {
      console.log(result);
      // if (result === 'ok') {
      this.getData();
      // }
    });
  }

  /**
   * 关闭应用
   * @param {string} appname
   */
  stopApp(appname?: string) {
    const self = this;
    // 更新数据
    const subscription = this.modalService.open({
      title: '关闭应用',
      // 显示弹窗内容
      content: ApplicationsformComponent,
      footer: false,
      onOk() {
        // 刷新数据
        self.getData();
      },
      onCancel() {
        // 消息提醒
        // alert('you cancel this action');
      },
      // 向子组件传递的参数
      componentParams: {
        appname: appname,
        action: 'stop'
      }
    });
    subscription.subscribe(result => {
      console.log(result);
      // if (result === 'ok') {
      this.getData();
      // }
    });
  }

  /**
   * 删除单条
   * @param {string} id
   */
  delete(appname: string) {
    // console.log
    console.log(appname);
  }

  submitForm(formData?: any) {}

  /**
   * 清除搜索框数据
   */
  clearSearchParams() {
    for (const key in this.searchParmas.values) {
      if (key) {
        this.searchParmas.values[key] = '';
      }
    }
  }

  _startValueChange = () => {
    const { startDate, endDate } = this.searchParmas.values;
    if (startDate > endDate) {
      this.searchParmas.values.endDate = null;
    }
  }

  _endValueChange = () => {
    const { startDate, endDate } = this.searchParmas.values;
    if (startDate > endDate) {
      this.searchParmas.values.startDate = null;
    }
  }
}
