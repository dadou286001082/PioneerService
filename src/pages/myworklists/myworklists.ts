import {Component} from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import {MyworklistsDetailPage} from "./myworklists-detail/myworklists-detail";
import {AppService} from "../../providers/app.service";
import {UserParticulars} from "../userpage/user/userparticulars";
import {UserPage} from "../userpage/user/user";
import {Loginstate} from "../login/loginstate";

@Component({
  selector: 'page-about',
  templateUrl: 'myworklists.html'
})

//用户我的工单页面

export class MyworklistsPage {
  myworklistType: string = 'undone';


  pagination;
  jsonText;
  _params;

  mylists= [];
  errorMessage: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public appService: AppService,public userParticulars:UserParticulars,
              public loginState:Loginstate) {

  }
  ionViewDidLoad(){
    this.loadData('2');
  }
  private loadData(type:string){

    this.pagination = {
      page:'1',
      count:'10'
    }
    this.jsonText = {
      user_id:this.loginState.loginUserId,
      work_sheet_type:type,
      pagination:this.pagination
    }
    this._params ={
      route:'work_sheet/work_sheet/getUserWorkSheetList',
      token:this.loginState.token,
      jsonText:JSON.stringify(this.jsonText)
    };

    this.appService.httpPost(this._params, d => {

      let data = d.data;
      this.mylists= data['work_sheet_list'];
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

  //标签变化监听
  sysChanged(){
    if(this.myworklistType =='undone'){
      console.log('undone');
    }else if(this.myworklistType =='done'){
      console.log('done');
    }
  }

  //下拉刷新
  doRefresh(refresher) {
    if(this.myworklistType =='undone'){
      this.loadData('2');
    }else if(this.myworklistType =='done'){
      this.loadData('3');
    }
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  /**
   * 跳转到个人中心
   */
  onUser(){
    this.navCtrl.push(UserPage);
  }
}
