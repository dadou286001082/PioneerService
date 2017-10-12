import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PasswordPage} from "../passwords/password";

@Component({
  selector: 'page-user-details',
  templateUrl: 'userDetails.html'
})
export class UserDetailsPage {

  constructor(public navCtrl: NavController) {

  }
  upPassword(){
    this.navCtrl.push(PasswordPage);
  }
}
