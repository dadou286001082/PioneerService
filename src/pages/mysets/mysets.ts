import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {MysetsDetailPage} from "./mysets-detail";
import {UserPage} from "../userpage/user/user";
import {AppService} from "../../providers/app.service";
import {Md5} from "ts-md5/dist/md5";
import {UserpageService} from "../userpage/userpage.service/userpage.service";
import {UserBase} from "../userpage/user/userbase";
import {Loginstate} from "../login/loginstate";
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
              ,public userBase:UserBase,public loginState:Loginstate){

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
    this.jsonText1={
      // mobile:'15900666666',
      // password:'123456',
      // code:Md5.hashStr('15900666666'+'poineer_api_nFWn18Wm')
      mobile:'18629692029',
      password:'123456',
      code:Md5.hashStr('18629692029'+'poineer_api_nFWn18Wm')
    }
    this.params1 ={
      route:'user/user/login',
      jsonText:JSON.stringify(this.jsonText1)

    }
    //   "status": {
    //     "succeed": "1"
    //   },
    //   "data": {
    //     "user_id": "2",
    //       "token": "90e83a273d0ef85420187e7450f98426"
    //   }
    // }
    this.userPagerService.httpPost(this.params1,d=>{
      // console.log("点击返回"+JSON.stringify(d));
      this.userBase.succeed=d.status['succeed'];
      this.userBase.user_id=d.data['user_id'];
      this.userBase.token=d.data['token'];
      console.log("登陆返回"+this.userBase.succeed+this.userBase.user_id+this.userBase.token);
    },true);

  }



}

