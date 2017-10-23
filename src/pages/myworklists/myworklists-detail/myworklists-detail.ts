import { Component } from '@angular/core';
import { NavParams} from 'ionic-angular';
import {AppService} from "../../../providers/app.service";
import {MyworklistDetailData} from "./myworklist-detail-data";

@Component({

  templateUrl:'myworklists-detail.html'
})

//获取工单详情列表

export class MyworklistsDetailPage{

  item;
  myworklistsImg = [];
  //获取到的值
  data;
  plate_num;
  work_sheet_num;
  work_sheet_category_name;
  work_sheet_status_name;

  jsonText: any = {
    user_id:'7',
    work_sheet_no:'TEST-001'
    // work_sheet_no:JSON.stringify(this.item.work_sheet_no)
  }
  _params: any ={
    route:'work_sheet/work_sheet/getUserWorkSheetDetail',
    token:'9a580777d6fed242ccd12d1be9b3652f',
    jsonText:JSON.stringify(this.jsonText)
  };
  constructor(params: NavParams,public appService:AppService,public myworklistDetailData:MyworklistDetailData) {
    this.item = params.data.item;
    console.log('1---'+JSON.stringify(this.item.work_sheet_no));
  }

  ionViewDidLoad(){
    this.loadData();
  }


  private loadData(){
    console.log('2---'+JSON.stringify(this.item.work_sheet_no));
    this.appService.httpPost(this._params, d => {
      let data2 = d.data.work_sheet_info.work_sheet_image_list;

      this.myworklistDetailData.work_sheet_num = d.data.work_sheet_info.work_sheet_no,
        this.myworklistDetailData.work_sheet_category_name   =d.data.work_sheet_info. work_sheet_category_info.work_sheet_category_name,
        this.myworklistDetailData.work_sheet_status_name= d.data.work_sheet_info.work_sheet_status_info.work_sheet_status_name,
        this.myworklistDetailData.plate_num=d.data.work_sheet_info.car_info.plate_no;
      this.myworklistDetailData.car_no=d.data.work_sheet_info.car_info.car_no;
      this.myworklistDetailData.parking_site_name=d.data.work_sheet_info.parking_site_info.parking_site_name;
      this.myworklistDetailData.work_sheet_date_format=d.data.work_sheet_info.work_sheet_date_format;

      console.log('3--'+JSON.stringify(this.myworklistDetailData.plate_num));
      // console.log('3--'+JSON.stringify(this.data['work_sheet_info']['work_sheet_no']));

      this.myworklistsImg = data2;
      console.log('4--'+this.myworklistsImg);
      if(d.status['succeed']=='1'){
        console.log('获取工单成功');
      }else{
        console.log('获取工单失败');
      }
    }, true);
  }
}
