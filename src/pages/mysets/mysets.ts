import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {MysetsDetailPage} from "./mysets-detail";
import {UserPage} from "../userpage/user/user";
import {AppService} from "../../providers/app.service";
import {Md5} from "ts-md5/dist/md5";
import {UserpageService} from "../userpage/userpage.service/userpage.service";
import {UserBase} from "../userpage/user/userbase";
import {Loginstate} from "../login/loginstate";
import {UserParticulars} from "../userpage/user/userparticulars";

@Component({
  selector: 'page-home',
  templateUrl: 'mysets.html'
})
//用户我的站点页面
export class MysetsPage {
  jsonText1;
  params1;

  index;
  items = [];
  errorMessage: string;

  pagination:any = {
    page:'1',
    count:'10'
  }
  jsonText: any = {
    user_id:'7',
    pagination:this.pagination
  }

  _params: any ={
    route:'parking_site/parking_site/getUserParkingSiteList',
    token:'9a580777d6fed242ccd12d1be9b3652f',
    jsonText:JSON.stringify(this.jsonText)
  };



  constructor(public nav: NavController,public navParams: NavParams,
              public appService: AppService,public userPagerService: UserpageService
              ,public userBase:UserBase,public loginState:Loginstate,public userParticulars:UserParticulars){

}

  ionViewDidLoad() {
    // this.index = this.navParams.get('item');
    // console.log('index' + this.index);
    this.loadData();
    this.lodUser();
  }
private loadData(){


  this.appService.httpPost(this._params, d => {
    let data = d.data;
    this.items = data['parking_site_list'];
    // console.log('111'+this.items[1]['parking_site_id']);
    if(d.status['succeed']=='1'){
      console.log('获取站点成功');
    }else{
      console.log('获取站点失败');
    }
  }, true);
}

  openNavDetailsPage(item) {
    this.nav.push(MysetsDetailPage, { item: item });
  }

  intoUserPage(){
    this.nav.push(UserPage);
  }
  /**
   * 获取登录token
   */
  lodUser(){
    this.jsonText={
      user_id:this.loginState.loginUserId
    }
    this.params1 ={
      route:'user/user/getUserDetail',
      token:this.loginState.token,
      jsonText:JSON.stringify(this.jsonText)

    }

    this.appService.httpPost(this.params1,d=>{
      // console.log("点击返回111"+JSON.stringify(d));
      this.userParticulars.succeed=d.status['succeed'];
      this.userParticulars.user_id=d.data.user_info['user_id'];
      this.userParticulars.user_name=d.data.user_info['user_name'];
      this.userParticulars.mobile=d.data.user_info['mobile'];
      this.userParticulars.mobile_format=d.data.user_info['mobile_format'];
      this.userParticulars.thumb=d.data.user_info.icon_image['thumb'];
      this.userParticulars.source=d.data.user_info.icon_image['source'];
      this.userParticulars.user_group_id=d.data.user_info.user_group_info['user_group_id']
      this.userParticulars.user_group_name=d.data.user_info.user_group_info['user_group_name']



      console.log("头像"+this.userParticulars.thumb+"-----"+ this.userParticulars.source
      );
    },true);

  }



}

