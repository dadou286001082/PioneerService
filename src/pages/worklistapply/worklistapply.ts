import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserPage} from "../userpage/user/user";
import {UserParticulars} from "../userpage/user/userparticulars";


@Component({
  selector: 'page-contact',
  templateUrl: 'worklistapply.html'
})
/**
 * 工单申请
 */
export class WorklistapplyPage {

  constructor(public navCtrl: NavController,public userParticulars:UserParticulars) {

  }

  /**
   * 进入个人中心
   */
  onUsers(){
this.navCtrl.push(UserPage)
  }
}
