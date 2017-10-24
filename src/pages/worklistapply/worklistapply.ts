import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserPage} from "../userpage/user/user";
import {UserParticulars} from "../userpage/user/userparticulars";
import {AppService} from "../../providers/app.service";

@Component({
  selector: 'page-contact',
  templateUrl: 'worklistapply.html'
})
/**
 * 工单申请
 */
export class WorklistapplyPage {
  jsonText;
  params;
  provinceList=[];//省份&id列表
  capital:string;//选择框选中省份
  carnumbser:string;//用户输入的车牌号

  workList=[];//工单类型列表
  works:string;//选择框选中工单类型
  applyReason:string;//工单申请原因
  constructor(public navCtrl: NavController,public userParticulars:UserParticulars,public appService:AppService) {

  }
//工单申请
  workOk(){
  console.log("省份"+this.capital+this.carnumbser+this.works+this.applyReason);

  }


  ionViewDidLoad(){

    this.params ={
      route:'base/province_code/getProvinceCodeList'
    }
    this.appService.httpPost(this.params,d=>{
      console.log(JSON.stringify(d));
        this.provinceList=d.data['province_code_list'];
    },true)

    this.params ={
      route:'base/work_sheet_category/getWorkSheetCategoryList'
    }
    this.appService.httpPost(this.params,d=>{
      console.log(JSON.stringify(d));
        this.workList=d.data['work_sheet_category_list'];
    },true)


  }
//拍照第一张
  photo1(){
  console.log("拍照第一张");
  }


  /**
   * 进入个人中心
   */
  onUsers(){
this.navCtrl.push(UserPage)
  }
}
