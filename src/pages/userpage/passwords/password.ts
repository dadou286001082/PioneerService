import { Component } from '@angular/core';
import {NavController, NavParams, Toast} from 'ionic-angular';
import {AppService} from "../../../providers/app.service";
import {UserBase} from "../user/userbase";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'page-password',
  templateUrl: 'password.html'
})
/**
 * 修改密码界面
 */
export class PasswordPage {
  jsonText;
  params;
  loginForm: FormGroup;
  username: any;
  password: any;
  twopassword: any;
  oldpassword :any;//原密码
  newpassword:any;//新密码
  twonewpassword:any;//再次输入新密码
  upState:string;//前后密码是否一致

  constructor(public navCtrl: NavController,public navParams :NavParams,public appService:AppService,
              public userBase:UserBase, private formBuilder: FormBuilder
              ) {
    this.loginForm = formBuilder.group({
      // username: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.required, Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
      username: ['', Validators.compose([ Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      twopassword: ['', Validators.compose([Validators.required])]
    })
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
    this.twopassword = this.loginForm.controls['twopassword'];
    // console.log("密码"+ this.password );

  }
  login(value) {
    console.log("账号--"+  this.oldpassword+this.newpassword+this.twonewpassword);
    // console.log("密码--"+ this.loginForm.controls['password'] );

    if ( this.newpassword!=this.twonewpassword) {
     this.upState="* 新密码不一致";
      console.log("密码不一样");
    } else {
      this.upState="";
      console.log("密码一样");

      this.jsonText={
        user_id:this.userBase.user_id,
        old_password:this.oldpassword,
        new_password:this.newpassword
      }
      this.params ={
        route:'user/user/editUserInfo',
        token:this.userBase.token,
        jsonText:JSON.stringify(this.jsonText)

      }

      this.appService.httpPost(this.params,d=>{
        console.log(JSON.stringify(d));

        if(d.status['succeed']==1){

          this.appService.alert("修改成功");
        }else {
          this.appService.alert("修改失败");
        }

      },true)


    }

  }
  ionViewDidLoad(){


}

}
