import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import  { UserDetailsPage } from "./../userdetail/userDetails";
import {SettingsPage} from "./../settings/settings";
import  { UserpageService }from '../userpage.service/userpage.service';
import { AlertController } from 'ionic-angular';


/**
 * 个人中心页面
 */
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  jsonText :any ={
    mobile:'15900666666',
    password:'123456',
    code:'b22f37720171a933d977d3872424edde'

}



  params: any={
    route:'user/user/login',
    jsonText:JSON.stringify(this.jsonText)



  }


  constructor(public navCtrl: NavController,public alerCtrl: AlertController,public userpageService :UserpageService) {

  }
  ionViewDidLoad(){
    this.userpageService.httpPost(this.params,d=>{
      console.log(d);
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
