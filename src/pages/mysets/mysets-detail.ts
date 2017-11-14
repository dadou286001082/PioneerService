import { Component } from '@angular/core';
import {NavParams,NavController } from 'ionic-angular';
import {AppService} from "../../providers/app.service";
import {MyworklistsDetailPage} from "../myworklists/myworklists-detail/myworklists-detail";
@Component({
  templateUrl:'mysets-detail.html'
})

export class MysetsDetailPage {

  ifShow_mysets:boolean=false;//是否显示暂无订单图片

  item; //上个页面返回的某一条的参数
  params;   //向站点服务器上传的参数
  jsonText;
  //向站点强请请求返回的参数
  parking_site_name;
  parking_site_address;
  pending_work_sheet_count;

  //待结单工单列表
  workLists = [];


  params2;//向待结单上传参数
  jsonText2;
  pagination;

  constructor(public nav: NavController,params: NavParams,public appService:AppService) {
    this.item = params.data.item;
  }

  ionViewDidLoad() {
    this.loadData();
    this.loadList();
  }

  //初始化页面
  private loadData(){
    this.jsonText = {
      user_id:'7',
      parking_site_no:this.item.parking_site_no
    }
    this.params ={
      route:'parking_site/parking_site/getUserParkingSiteDetail',
      token:'9a580777d6fed242ccd12d1be9b3652f',
      jsonText:JSON.stringify(this.jsonText)
    };

    this.appService.httpPost(this.params, d => {
      if(d.status['succeed']=='1'){
        console.log('获取站点详情成功');
        this.parking_site_name= d.data['parking_site_info']['parking_site_name'];
        this.parking_site_address= d.data['parking_site_info']['parking_site_address'];
        this.pending_work_sheet_count= d.data['parking_site_info']['pending_work_sheet_count'];
      }else{
        console.log('获取站点详情失败'+d);
      }
    }, true);
  }
  //请求待结单列表
  private loadList(){
    this.pagination = {
      page:'1',
      count:'10'
    }
    this.jsonText2 = {
      user_id:'7',
      work_sheet_type:'1',
      pagination:this.pagination
    }
    this.params2 = {
      route:'work_sheet/work_sheet/getUserWorkSheetList',
      token:'9a580777d6fed242ccd12d1be9b3652f',
      jsonText:JSON.stringify(this.jsonText2)
    };
    this.appService.httpPost
      (this.params2, d => {
        if(d.status['succeed']=='1'){
          console.log('获取待结单成功'+d);
          this.workLists = d.data['work_sheet_list'];
          if(this.workLists.length == 0){
            console.log("无列表"+this.workLists.length);
           this.ifShow_mysets = true;
          }else{
            this.ifShow_mysets = false;
          }
          // this.parking_site_name= d.data['parking_site_info']['parking_site_name'];
          // this.parking_site_address= d.data['parking_site_info']['parking_site_address'];
          // this.pending_work_sheet_count= d.data['parking_site_info']['pending_work_sheet_count'];
        }else{
          console.log('获取待结单失败'+d);
        }
      }, true);


  }


  openMySheetPage(item) {
    this.nav.push(MyworklistsDetailPage, { item: item });
  }
}

