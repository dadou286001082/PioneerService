import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {MysetsDetailPage} from "./mysets-detail";
import {UserPage} from "../userpage/user/user";
import {AppService} from "../../providers/app.service";

@Component({
  selector: 'page-home',
  templateUrl: 'mysets.html'
})
export class MysetsPage {

  index;
  items = [];
  errorMessage: string;
  pagination:any = {
    page:'1',
    count:'10'
  }
  jsonText: any = {
    user_id:'7',
    pagination:this.pagination
  }

  _params: any ={
    route:'parking_site/parking_site/getUserParkingSiteList',
    token:'9a580777d6fed242ccd12d1be9b3652f',
    jsonText:JSON.stringify(this.jsonText)
  };
  constructor(public nav: NavController,public navParams: NavParams, public appService: AppService){

}

  ionViewDidLoad() {
    // this.index = this.navParams.get('item');
    // console.log('index' + this.index);
    this.loadData();
  }
private loadData(){
  this.appService.httpPost(this._params, d => {

    let data = d.data;
    this.items = data['parking_site_list'];
    // console.log('111'+this.items[1]['parking_site_id']);
    if(d.status['succeed']=='1'){
      console.log('获取站点成功');
    }else{
      console.log('获取站点失败');
    }
  }, true);
}

  openNavDetailsPage(item) {
    this.nav.push(MysetsDetailPage, { item: item });
  }

  intoUserPage(){
    this.nav.push(UserPage);
  }

}

