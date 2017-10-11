import {Component} from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import {MyworklistsDetailPage} from "./myworklists-detail/myworklists-detail";
import {MyworklistsService} from "./myworklists.service/myworklists.service";

@Component({
  selector: 'page-about',
  templateUrl: 'myworklists.html'
})
export class MyworklistsPage {
  mylists = [];
  errorMessage: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public myworklistsservice: MyworklistsService) {

  }
  ionViewDidLoad(){
    this.myworklistsservice.getMyworkLists().subscribe(
      countries => this.mylists = <any>countries,
      error =>this.errorMessage = <any> error,
    );
  }
  startPage() {
    this.navCtrl.push(MyworklistsDetailPage);
  }
}
