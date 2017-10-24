import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import  { UserDetailsPage } from "./../userdetail/userDetails";
import {SettingsPage} from "./../settings/settings";
import  { UserpageService }from '../userpage.service/userpage.service';
import { AlertController } from 'ionic-angular';
import {Md5} from "ts-md5/dist/md5";
import {UserBase} from "./userbase";
import {isIonic, isIonicOrAngular} from "@ionic/app-scripts";
import {variable} from "@angular/compiler/src/output/output_ast";
import {bindCallback} from "rxjs/observable/bindCallback";
import {tokenize} from "@angular/compiler/src/ml_parser/lexer";
import {UserParticulars} from "./userparticulars";
import {LoginPage} from "../../login/login";
import{ App } from 'ionic-angular';
/**
 * 个人中心页面
 */
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  tokens:String;//token
  jsonText;
  params;

  constructor(public navCtrl: NavController,public alerCtrl: AlertController,public userpageService :UserpageService,
              public userBase:UserBase,public userParticulars:UserParticulars,private app:App
              ) {}


  ionViewDidLoad(){



  }

  intoUserDetails(){
    this.navCtrl.push(UserDetailsPage);
  }
  settings(){
    this.navCtrl.push(SettingsPage);
  }

  /**
   * 退出登录
   */
  quitLog() {
    // this.jsonText={
    //   user_id:this.userBase.user_id
    // }
    // this.params ={
    //   route:'user/user/logout',
    //   token:this.userBase.token,
    //   jsonText:JSON.stringify(this.jsonText)
    //
    // }





    let confirm = this.alerCtrl.create({
      title: '确认退出吗?',

      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确认',
          handler: () => {
            localStorage.removeItem("name");　 　//用于从本地存储中删除该项目
            localStorage.removeItem("pasword");　 　//用于从本地存储中删除该项目
            // this.navCtrl.push(LoginPage);
            this.app.getRootNav().push(LoginPage);
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present()
  }
}
