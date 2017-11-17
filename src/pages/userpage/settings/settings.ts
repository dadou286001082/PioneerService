import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AboutusPage} from "../aboutus/aboutus";
import { AlertController } from 'ionic-angular';
import {AppService} from "../../../providers/app.service";
import {SetUrl} from "./setUrl";

// import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'page-setings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
params;
jsonText;
  constructor(public navCtrl: NavController,public alerCtrl: AlertController,private appService:AppService,
              public  setUrl:SetUrl
              ) {
  }

  ionViewDidLoad(){
    this.jsonText ={
      request_type:'1'
    }
    this.params={
      route:'about/info/getDataInfo',
      jsonText:JSON.stringify(this.jsonText)
    }

    this.appService.httpPost(this.params,d=>{
      console.log(JSON.stringify(d));

      this.setUrl.settUrl=d.data.data_value['content'];
    },true);
  }
  /**
   * 打开关于我们
   */
  aboutUs(){
    console.log("seturl======="+this.setUrl.settUrl);
    this.navCtrl.push(AboutusPage);
  }

  /**
   * 清除缓存
   */
  clear() {
    let confirm = this.alerCtrl.create({
      title: '确定清除缓存吗?',

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

  /**
   * 检查版本更新
   */
  upVersion() {
    this.params={
      route:'base/client_config/getClientConfig',

    }
  this.appService.httpPost(this.params,d=>{
    console.log("----"+d.data.config_list[0]['data']['need_update']);

if(d.data.config_list[0]['data']['need_update']==0) {

  let alert = this.alerCtrl.create({
    title: '当前为最新版本',
    //message: 'Your friend, Obi wan Kenobi, just approved your friend request!',
    buttons: ['确认']
  });
  alert.present()
}
  },true);

  }


  settingBack(){
    this.navCtrl.pop();
  }
}
