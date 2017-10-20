import {Component} from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import {MyworklistsDetailPage} from "./myworklists-detail/myworklists-detail";
import {AppService} from "../../providers/app.service";

@Component({
  selector: 'page-about',
  templateUrl: 'myworklists.html'
})

//用户我的工单页面

export class MyworklistsPage {
  pagination:any = {
    page:'1',
    count:'10'
  }
  jsonText: any = {
    user_id:'7',
    work_sheet_type:'3',
    pagination:this.pagination
  }
  _params: any ={
    route:'work_sheet/work_sheet/getUserWorkSheetList',
    token:'9a580777d6fed242ccd12d1be9b3652f',
    jsonText:JSON.stringify(this.jsonText)
  };


  mylists = [];
  errorMessage: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {

  }
  ionViewDidLoad(){
    // this.myworklistsservice.getMyworkLists().subscribe(
    //   countries => this.mylists = <any>countries,
    //   error =>this.errorMessage = <any> error,
    // );
    this.loadData();

  }

  private loadData(){
    this.appService.httpPost(this._params, d => {

      let data = d.data;
      this.mylists = data['work_sheet_list'];
      if(d.status['succeed']=='1'){
        console.log('获取工单成功');
      }else{
        console.log('获取工单失败');
      }
    }, true);
  }
  startPage(item) {
    this.navCtrl.push(MyworklistsDetailPage,{item:item});
  }
}
