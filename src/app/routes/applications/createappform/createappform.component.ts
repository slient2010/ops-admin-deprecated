import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { ApplicationsService } from '../applications.service';
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { PkginfoService} from '../../pkginfo/pkginfo.service';
import { GridComponent } from '@core/grid.component';
import { version } from 'punycode';

@Component({
  selector: 'app-createappform',
  templateUrl: './createappform.component.html',
  styleUrls: ['./createappform.component.css'],
  providers: [ApplicationsService, PkginfoService]
})
export class CreateappformComponent extends GridComponent implements OnInit {

  validateForm: FormGroup;
  _action: string;
  serverlists: any;

  formData = {
    appname: '',
    version: '',
    workerid: '',
  };
  constructor(
    private message: NzMessageService,
    private applicationService: ApplicationsService,
    private pkginfoService: PkginfoService,
    private fb: FormBuilder,
    private subject: NzModalSubject
  ) {
    super(applicationService);
    this.subject.on('onDestory', () => {
      console.log('destroy');
      console.log('message: ', message);
    });
  }

  ngOnInit() {
    this.getPkgDatas();
    this.getServerLists();
    this.validateForm = this.fb.group({
      appname: [null, [Validators.required]],
      version: [null, [Validators.required]],
      workerid: [null, [Validators.required]]
    });
  }


  /**
   * 获取应用安装包信息
   * @param {null}
   */

   getPkgDatas = () => {
     this.setLoading(true);
     this.pkginfoService
     .getPkgList(this.current, this.pageSize)
     .then((result: any) => {
       const {data, total} = result;
       this.formData = {
          appname: '',
          version: data.pkglists,
          workerid: this.serverlists
       };
      //  this.setpkgListsData(data.pkglists);
       this.setLoading(false);
     });
   }

   getServerLists = () => {
     const self = this;
     self.serverlists = self.applicationService.getServerLists().then((result: any) => {
        const {data, total} = result;
        self.serverlists  = data;
        return self.serverlists;
     });
    //  console.log('ssssssssssssssss', self.serverlists);
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
      const version = this.validateForm.value.version.name;
      const workerid = this.validateForm.value.workerid;
      // todo: 提交数据到后台
      const submitdata = [
        {
          action: 'createapp',
          appname: appname,
          version: version,
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
    return this.validateForm.controls[name];
  }
}
