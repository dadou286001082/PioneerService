import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {AppService} from "../../../providers/app.service";
import { Http, Response, Headers/*, BaseRequestOptions*/ } from '@angular/http';
import {SetUrl} from "../settings/setUrl";
import {DomSanitizer} from '@angular/platform-browser';//内部加载页面iframe标签
/**
 *  关于我们页面
 */
@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html'
})
export class AboutusPage {
  aboutUrl:string;//关于们的url
  ss:string='http://218.244.158.175/xauto_poineer_server/app_website/index.php?route=aboutus/aboutus';
  srcUrl:any;
  jsonText : any={
  request_type:'1'
}
  params :any={
    route:'about/info/getDataInfo',
    jsonText:JSON.stringify(this.jsonText)
}
  constructor(public navCtrl:NavController,public navParams: NavParams,private appService:AppService,
              public  setUrl:SetUrl,private sanitizer: DomSanitizer
              ) {
    this.aboutUrl=this.setUrl.settUrl;
    this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.setUrl.settUrl);
  }

ionViewDidLoad(){

  console.log("我们地址"+this.aboutUrl);
    this.appService.httpPost(this.params,d=>{
      console.log(JSON.stringify(d))

    },true);


}
  aboutusBack(){
  this.navCtrl.pop();
  }

}
