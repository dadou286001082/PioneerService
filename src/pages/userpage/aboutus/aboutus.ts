import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import { Http, Response, Headers/*, BaseRequestOptions*/ } from '@angular/http';


/**
 * 关于我们页面
 */

@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html'
})
export class AboutusPage {
  params :any={
    route:'about/info/getDataInfo',
    request_type:'1'
}
  constructor(public navCtrl:NavController,public navParams: NavParams) {
  }




}
