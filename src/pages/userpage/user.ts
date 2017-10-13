import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import  { UserDetailsPage } from "./userdetail/userDetails";
import {SettingsPage} from "./settings/settings";

import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  constructor(public navCtrl: NavController,public alerCtrl: AlertController) {

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
