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
              public userBase:UserBase,public userParticulars:UserParticulars
              ) {}


  ionViewDidLoad(){


    this.jsonText={
      user_id:this.userBase.user_id
    }
    this.params ={
      route:'user/user/getUserDetail',
      token:this.userBase.token,
      jsonText:JSON.stringify(this.jsonText)

    }

    this.userpageService.httpPost(this.params,d=>{
      // console.log("点击返回111"+JSON.stringify(d));
      this.userParticulars.succeed=d.status['succeed'];
      this.userParticulars.user_id=d.data.user_info['user_id'];
      this.userParticulars.user_name=d.data.user_info['user_name'];
      this.userParticulars.mobile=d.data.user_info['mobile'];
      this.userParticulars.mobile_format=d.data.user_info['mobile_format'];
      this.userParticulars.thumb=d.data.user_info.icon_image['thumb'];
      this.userParticulars.source=d.data.user_info.icon_image['source'];
      this.userParticulars.user_group_id=d.data.user_info.user_group_info['user_group_id']
      this.userParticulars.user_group_name=d.data.user_info.user_group_info['user_group_name']



      console.log("个人中心返回数据"+this.userParticulars.user_name+
        this.userParticulars.mobile+this.userParticulars.mobile_format+this.userParticulars.thumb+ this.userParticulars.source+
        this.userParticulars.user_group_id+this.userParticulars.user_group_name
      );
    },true);
  }

  intoUserDetails(){
    this.navCtrl.push(UserDetailsPage);
  }
  settings(){
    this.navCtrl.push(SettingsPage);
  }
  quitLog() {
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
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present()
  }
}
