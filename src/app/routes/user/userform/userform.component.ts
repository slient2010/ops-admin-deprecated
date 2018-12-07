import {Component, OnInit, Input} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {NzModalSubject, NzMessageService} from 'ng-zorro-antd';
import {UserService} from '../user.service';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.less'],
  providers: [UserService]
})
export class UserformComponent implements OnInit {
  validateForm: FormGroup;
  _id: string;
  _userdata: string;

  /**
   * 表单模型对象
   * @type {{id:string; name: string; nickName: string; gender: string; age: string; phone: string; email: string; address: string}}
   */
  formData = {
    id:'' ,
    name: '',
    nickName: '',
    gender: '',
    age: '',
    phone: '',
    email: '',
    address: ''
  };
  _options = [{
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

  @Input()
  set id(value: string) {
    console.log("setid", value);
      this._id = value;
  }
  getData(id) {

    // return [];
    let s: any[] = [];
    s = [{
          "id": "230000198305256381",
          "name": "Shirley Lopez",
          "nickName": "Thompson",
          "phone": "14624246428",
          "age": 77,
          "address": "西藏自治区 山南地区 隆子县",
          "isMale": false,
          "email": "j.wzbmlb@tmnw.eg",
          "createTime": "2003-06-01 17:13:06",
          "avatar": "http://dummyimage.com/100x100/b9f279/757575.png&text=T"
        }];
    return  s;
        }

  createOrUpdateFormData() {
    
    console.log("update", this._id);
    if (this._id === "" || this._id === undefined) {
      // 新增
      console.log("add new data ");
      this.formData = {
        id:"",
        name:"",
	nickName: '',
	gender: '',
	age: '',
	phone: '',
	email: '',
	address: ''
      };

    } else {
      // 更新
      // 通过id 获取数据
      let updatedData: any[] = [];
      console.log("update data: ", this._id);
      updatedData = this.getData(this._id);
      console.log("updatedData:", updatedData[0].id);

      this.formData = {
        id:this._id,
        name:updatedData[0].name,
	nickName: updatedData[0].nickName,
	gender: updatedData[0].isMale,
	age: updatedData[0].age,
	phone: updatedData[0].phone,
	email: updatedData[0].email,
	address: updatedData[0].address
      };
    }
  }


  constructor(private message: NzMessageService, private userService: UserService, private fb: FormBuilder, private subject: NzModalSubject) {
    this.subject.on('onDestory', () => {
      console.log('destroy');
    });
  }

  ngOnInit() {
    this.createOrUpdateFormData();
    this.validateForm = this.fb.group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required]],
      nickName: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      age: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^1[34578]\d{9}$/)]],
      email: [null, [Validators.required, Validators.email]],
      address: [null, [Validators.required]]
    });
  }

  /**
   * 表单提交方法
   * @private
   */
  _submitForm() {
    for (const i in this.validateForm.controls) {
      console.log("submit data:", this.validateForm.controls[i].value);
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
        // data submit
    console.log("check the submit data:", this.validateForm);
    if (this.validateForm.valid) {

    const userName = this.validateForm.value.name;
    const age = this.validateForm.value.age;
    // todo: 提交数据到后台
                // this.loginService.login(userName, password)
                // .then(result => {
                // this.router.navigate(['']);
                // }, (err) => {
                // this.loadStatus = false;
                // this.loginBtn = 'Login';
                // this._message.error('登录失败！');
                // });
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
    // console.log("name?:", name);
    // console.log("data test:", this.validateForm.controls[name].value);
    return this.validateForm.controls[name];
  }
}
