import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";

@Component({
  templateUrl:'login.html',
  selector:'page-login'
})

export class LoginPage{

  constructor(public navCtrl: NavController){

  }

  goToTabs(){
    this.navCtrl.setRoot(TabsPage);
  }
}
