import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import  { UserDetailsPage } from "./userdetail/userDetails";
import {SettingsPage} from "./settings/settings";

//import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  constructor(public navCtrl: NavController) {

  }

  intoUserDetails(){
    this.navCtrl.push(UserDetailsPage);
  }
  settings(){
    this.navCtrl.push(SettingsPage);
  }
  //quitLog(){
  //  let alert = this.alert.create({
  //    title: '确定退出吗?',
  //    //message: 'Your friend, Obi wan Kenobi, just approved your friend request!',
  //    buttons: ['确定']
  //  });
  //  alert.present()
  //}
}
