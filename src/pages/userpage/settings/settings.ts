import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AboutusPage} from "../aboutus/aboutus";
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-seting',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController,public alerCtrl: AlertController) {
  }
  aboutUs(){
    this.navCtrl.push(AboutusPage);
  }
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
  upVersion() {
    let alert = this.alerCtrl.create({
      title: '当前为最新版本',
      //message: 'Your friend, Obi wan Kenobi, just approved your friend request!',
      buttons: ['确认']
    });
    alert.present()
  }
}
