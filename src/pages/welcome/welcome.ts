
import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";

@Component({
  templateUrl:'welcome.html'
})

//   欢迎页面
export class WelcomePage{
  constructor(public navCtrl:NavController){

  }

  goToHome(){
    this.navCtrl.setRoot(LoginPage);
  }
}
