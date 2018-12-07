import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ServersService } from './servers.service';
import { ServersformComponent } from './serversform/serversform.component';
import { SearchParams } from '@core/interfaces/table.interface';
import { GridComponent } from '@core/grid.component';

@Component({
  selector: 'app-servers',
  templateUrl: 'servers.component.html',
  styleUrls: ['./servers.component.less'],
  providers: [ServersService]
})
export class ServersComponent extends GridComponent implements OnInit {
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

  constructor(private serversService: ServersService, private message: NzMessageService, private modalService: NzModalService) {
    super(serversService);
    this.searchParmas.params.options = this.serversService.getCityData();
    /**
     * 列表操作按钮
     */
    this.setGridView('operations', [
      {
        text: '开启应用服务',
        event: (id) => {
          this.createOrUpdate(id);
        }
      },
      {
        text: '关闭服务',
        isConfirm: true,
        title: '确定要关闭这个吗?',
        event: (id) => {
          this.delete(id);
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
    this.serversService.getServersList(event || this.current, this.pageSize)
      .then((result: any) => {
	console.log("get data:", result)
        const { data, total } = result;
        this.setTableData(data);
        this.setTotal(total);
        this.setLoading(false);
      });
  }


//修改用户信息获取数据
  getServersData = (event?:string)=>{
       console.log("update servers data:", event);
       return event;

  }

  /**
   * 新增或修改单条数据
   * @param {string} id
   */
  createOrUpdate(id?: string) {
    const self = this;
    // 更新数据
    const subscription = this.modalService.open({
      title: id ? '更新数据' : '新增数据',
      content: ServersformComponent,
      footer: false,
      onOk() {
	      // 刷新数据
        self.getData();
      },
      onCancel() {
	      // alert("you cancel this action");
      },
	    // 提交参数
      componentParams: {
        id: id,
      }
    });
    subscription.subscribe(result => {
      if (result === 'ok') {
        this.getData();
      }
    });
  }

  /**
   * 删除单条
   * @param {string} id
   */
  delete(id: string) {

  }

  submitForm(formData?: any) {

  }

  /**
   * 清除搜索框数据
   */
  clearSearchParams() {
    for (const key in this.searchParmas.values) {
      this.searchParmas.values[key] = '';
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
