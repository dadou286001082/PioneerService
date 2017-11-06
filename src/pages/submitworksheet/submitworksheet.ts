import {Component} from "@angular/core";
import {NavController,NavParams} from "ionic-angular";
import {AppService} from "../../providers/app.service";
import {Loginstate} from "../login/loginstate";

@Component({
  templateUrl:'submitworksheet.html'
})
//提交完成后的工单
export class SubmitworksheetPage{
  item;
  remark:string;//工单申请原因
  constructor(public navCtrl: NavController, navParams: NavParams,
              public appService: AppService,
              public loginState:Loginstate){
    this.item = navParams;
    console.log("item = "+JSON.stringify(this.item));
  }
  //确认提交工单 上传数据
 submit(){

 }


}
