import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { ApplicationsService } from '../applications.service';

@Component({
  selector: 'app-applicationsform',
  templateUrl: './applicationsform.component.html',
  styleUrls: ['./applicationsform.component.css'],
  providers: [ApplicationsService]
})
export class ApplicationsformComponent implements OnInit {
  validateForm: FormGroup;
  _id: string;
  _appname: string;
  _appdata: string;
  subdata: any[] = [];
  _tableData: any = [];
  _action: string;

  /**
   * 表单模型对象
   * @type {{id:string; name: string; nickName: string; gender: string; age: string; phone: string; email: string; address: string}}
   */

  formData = {
    appname: '',
    version: '',
    workerid: '',
    stat: '',
    created_time: ''
  };

  constructor(
    private message: NzMessageService,
    private applicationService: ApplicationsService,
    private fb: FormBuilder,
    private subject: NzModalSubject
  ) {
    this.subject.on('onDestory', () => {
      console.log('destroy');
      console.log('message: ', message);
    });
  }

  ngOnInit() {
    // 获取父组件传递过来的数据
    this.startOrStopFormData();
    this.validateForm = this.fb.group({
      appname: [null, [Validators.required]],
      stat: [null, [Validators.required]],
      created_time: [null, [Validators.required]],
      version: [null, [Validators.required]],
      workerid: [null, [Validators.required]]
    });
  }

  // 父组件传值过来
  @Input()
  set appname(value: string) {
    // this._id = value;
    this._appname = value;
  }

  @Input()
  set action(value: string) {
    this._action = value;
  }

  setTableData(value: any) {
    this._tableData = value;
  }

  get tableData() {
    return this._tableData;
  }

  // 获取参数
  getData(appname) {
    let s: any[] = [];
    // return [];

    // 获取所有应用数据，并返回匹配的数据
    this.applicationService
      .getApplicationsList(event, 0)
      .then((result: any) => {
        const { data, total } = result;
        this.setTableData(data);
        for (const i in data) {
          if (data[i].appname === appname) {
            s = data[i];
            this.subdata = data[i];
          }
        }
        return s;
      });

    s = [
      {
        appname: 'dev-tehang-system',
        stat: '未开启',
        created_time: '2018-11-05 10:21:44',
        version: 'v0.0.1',
        workerid: 'th-test-srv-01'
      }
    ];
    return s;
  }

  startOrStopFormData() {
    // 父组件传递过来的值
    console.log('update', this._appname);
    console.log('action', this._action);
    if (this._appname === '' || this._appname === undefined) {
      console.log('无关闭或开启的应用');
      return;
    }
    // let startData: any[] = [];
    // // 获取需要开启的数据
    // startData = this.getData(this._appname);
    // 获取所有应用数据，并返回匹配的数据
    this.applicationService
      .getApplicationsList(event, 0)
      .then((result: any) => {
        const { data, total } = result;
        this.setTableData(data);
        for (const i in data) {
          if (data[i].appname === this._appname) {
            this.subdata = data[i];
            this.formData = {
              // id:this._id,
              appname: this._appname,
              version: data[i].version,
              workerid: data[i].workerid,
              stat: data[i].stat,
              created_time: data[i].created_time
            };
          }
        }
      });

  }

  /**
   * 表单提交方法
   * @private
   */
  _submitForm() {
    for (const i in this.validateForm.controls) {
      if (i) {
        console.log('submit data:', this.validateForm.controls[i].value);
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    // data submit
    // console.log('check the submit data:', this.validateForm);
    if (this.validateForm.valid) {
      const appname = this.validateForm.value.appname;
      const workerid = this.validateForm.value.workerid;
      // todo: 提交数据到后台
      const submitdata = [
        {
          action: this._action, // 操作
          appname: appname,
          workerid: workerid
        }
      ];
      this.applicationService.submitdata(submitdata).then(
        result => {
          console.log(result);
        },
        err => {
          // this._message.error('登录失败！');
          console.log('提交失败！');
        }
      );
      console.log('提交数据成功！');
      // destroy方法可以传入onOk或者onCancel。默认是onCancel
      // 数据提交成功调用一下代码
      this.subject.destroy('onOk');
    }
    // 数据提交失败调用一下代码
    // this.subject.destroy('onCancel');
  }

  _cancel() {
    this.subject.destroy('onCancel');
  }

  getFormControl(name) {
    // console.log('name?:', name);
    // console.log('data test:', this.validateForm.controls[name].value);
    return this.validateForm.controls[name];
  }
}
