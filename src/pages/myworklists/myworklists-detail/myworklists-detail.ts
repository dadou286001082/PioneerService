import { Component } from '@angular/core';
import { NavParams} from 'ionic-angular';
import {AppService} from "../../../providers/app.service";
import {MyworklistDetailData} from "./myworklist-detail-data";
import {Loginstate} from "../../login/loginstate";

@Component({

  templateUrl:'myworklists-detail.html'
})

//获取工单详情列表

export class MyworklistsDetailPage{

  item;

  //获取到的值
  jsonText;
  params;
  constructor(params: NavParams,public appService:AppService,public loginState:Loginstate,public myworklistDetailData:MyworklistDetailData) {
    this.item = params.data.item;
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
      console.log('3----'+JSON.stringify(d));
      this.myworklistDetailData.work_sheet_no = d.data['work_sheet_info']['work_sheet_no']
        this.myworklistDetailData.work_sheet_category_name   =d.data.work_sheet_info. work_sheet_category_info.work_sheet_category_name,
        this.myworklistDetailData.work_sheet_status_name= d.data.work_sheet_info.work_sheet_status_info.work_sheet_status_name,
        this.myworklistDetailData.plate_num=d.data.work_sheet_info.car_info.plate_no;
      this.myworklistDetailData.car_no=d.data.work_sheet_info.car_info.car_no;
      this.myworklistDetailData.parking_site_name=d.data.work_sheet_info.parking_site_info.parking_site_name;
      this.myworklistDetailData.work_sheet_date_format=d.data.work_sheet_info.work_sheet_date_format;
      this.myworklistDetailData.myworklistsImg = d.data.work_sheet_info.work_sheet_image_list;
      if(d.status['succeed']=='1'){
        console.log('获取工单详情成功');
      }else{
        console.log('获取工单详情失败');
      }
    }, true);
  }
}
