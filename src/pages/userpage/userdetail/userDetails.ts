import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PasswordPage} from "../passwords/password";
import {UserParticulars} from "../user/userparticulars";

@Component({
  selector: 'page-user-details',
  templateUrl: 'userDetails.html'
})
/**
 * 用户详情界面
 */
export class UserDetailsPage {

  constructor(public navCtrl: NavController,public userParticulars:UserParticulars) {

  }

  /**
   * 进入修改密码
   */
  upPassword(){





    this.navCtrl.push(PasswordPage);
  }
}
