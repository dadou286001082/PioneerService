import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AppService} from "../../../providers/app.service";
import {MyworklistDetailData} from "./myworklist-detail-data";
import {Loginstate} from "../../login/loginstate";
import {OPERATOR_WORKSHEET, SUBMIT_WORKSHEET} from "../../../providers/app.global";
import {SubmitworksheetPage} from "../../submitworksheet/submitworksheet";

@Component({

  templateUrl:'myworklists-detail.html'
})

//获取工单详情列表

export class MyworklistsDetailPage{

  item; //上个页面传来的对应的某一条参数
  //获取到的值
  jsonText;
  params;
  //操作工单参数
  op_jsonText;
  op_params;
  constructor(navParams: NavParams,public appService:AppService,public navCtrl:NavController,
              public loginState:Loginstate,public myworklistDetailData:MyworklistDetailData) {
    this.item =navParams.data.item;
  }

  ionViewDidLoad(){
    this.loadData();

  }
  //初始化页面
  private loadData(){

    this.jsonText = {
      user_id:this.loginState.loginUserId,
      work_sheet_no:this.item.work_sheet_no
    }
    this.params ={
      route:'work_sheet/work_sheet/getUserWorkSheetDetail',
      token:this.loginState.token,
      jsonText:JSON.stringify(this.jsonText)
    };
    this.appService.httpPost(this.params, d => {
      console.log('1----'+JSON.stringify(d));
      if(d.status['succeed']=='1'){
        console.log('获取工单详情成功');
        this.myworklistDetailData.work_sheet_no = d.data['work_sheet_info']['work_sheet_no']
        this.myworklistDetailData.work_sheet_category_name   =
          d.data.work_sheet_info. work_sheet_category_info.work_sheet_category_name,
          this.myworklistDetailData.work_sheet_status_name= d.data.work_sheet_info.work_sheet_status_info.work_sheet_status_name,
          this.myworklistDetailData.plate_num=d.data.work_sheet_info.car_info.plate_no;
        this.myworklistDetailData.car_no=d.data.work_sheet_info.car_info.car_no;
        this.myworklistDetailData.parking_site_name=d.data.work_sheet_info.parking_site_info.parking_site_name;
        this.myworklistDetailData.work_sheet_date_format=d.data.work_sheet_info.work_sheet_date_format;
        this.myworklistDetailData.myworklistsImg = d.data.work_sheet_info.work_sheet_image_list;
        this.myworklistDetailData.work_sheet_status_id = d.data.work_sheet_info.work_sheet_status_info.work_sheet_status_id;
          console.log(this.myworklistDetailData.work_sheet_status_id);
       switch (this.myworklistDetailData.work_sheet_status_id){
         case '31':console.log("待结单");
           document.getElementById('btn').textContent = '确定接收工单';
         break;
         case '41':console.log("进行中");
           document.getElementById('btn').textContent = '完成后提交工单';
           break;
         case '51':console.log("已完成");
           document.getElementById('footer').style.visibility = 'hidden';
           break;
       }
      }else{
        console.log('获取工单详情失败');
      }
    }, true);
  }
  //工单不同状态的不同操作
  operateSheet(){
    switch (this.myworklistDetailData.work_sheet_status_id){
      case '31':console.log("待结单");
        this.acceptSheet();
        break;
      case '41':console.log("进行中");
      this.openSubmit(this.myworklistDetailData);
        break;
      case '51':console.log("已完成");
        break;
    }
  }
  //待结单状态   确认接单
  acceptSheet(){
    this.op_jsonText = {
      user_id:this.loginState.loginUserId,
      work_sheet_no:this.item.work_sheet_no,
      operator_type:"1"
    }
    this.op_params ={
      route:OPERATOR_WORKSHEET,
      token:this.loginState.token,
      jsonText:JSON.stringify(this.op_jsonText)
    };

    this.appService.httpPost(this.op_params, d => {
      console.log('2----'+JSON.stringify(d));
      if(d.status['succeed']=='1'){
        console.log('成功接单');
        this.loadData();
      }else{
        console.log('失败接单');
      }
    }, true);
  }

  //进入完成后提交工单界面
  openSubmit(item) {
    this.navCtrl.push(SubmitworksheetPage,item);
  }



  // //进行中状态   提交工单
  // submitSheet(){
  //   this.op_jsonText = {
  //     user_id:this.loginState.loginUserId,
  //     work_sheet_no:this.item.work_sheet_no,
  //     operator_type:"123"
  //   }
  //   this.op_params ={
  //     route:SUBMIT_WORKSHEET,
  //     token:this.loginState.token,
  //     jsonText:JSON.stringify(this.jsonText)
  //   };
  //
  //   this.appService.httpPost(this.op_params, d => {
  //     console.log('3----'+JSON.stringify(d));
  //     if(d.status['succeed']=='1'){
  //       console.log('成功接单');
  //     }else{
  //       console.log('失败接单');
  //     }
  //   }, true);
  // }
  //

}
