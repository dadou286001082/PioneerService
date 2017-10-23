import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {AppService} from "../../providers/app.service";
import {Md5} from "ts-md5/dist/md5";
import {Loginstate} from "./loginstate";
@Component({
  templateUrl:'login.html',
  selector:'page-login'
})

//登录界面
export class LoginPage{
  errorMessage: string;

  username :string;  //用户名
  password :string;  //密码
  jsonText;
  params;
  constructor(public navCtrl: NavController,public appService: AppService,public loginState:Loginstate){

  }

  goToTabs(){

    this.jsonText  = {
      mobile:this.username,
      password : this.password,
      // mobile:'18629692029',
      // password:'123456',
      //18629692029 code :e8112ee4ec74af7f706a2657754dd663
      // token:9a580777d6fed242ccd12d1be9b3652f userid:7
      code:Md5.hashStr(this.username+'poineer_api_nFWn18Wm')
    }

   this. params = {
      route: 'user/user/login',
      jsonText:JSON.stringify(this.jsonText)
    }



    console.log(this.username+'---'+this.password);
    console.log('---'+JSON.stringify(this.params));
    this.appService.httpPost(this.params, d => {
      // this.res=JSON.stringify(d);
      let res = d.status['succeed'];
      console.log('-----'+res);
      console.log('-----'+ d.data.token);
      if(res=='1'){
        console.log('登录成功');
        //如果登录成功，保存登录信息
        this.loginState.loginName = this.username;
        this.loginState.loginPWD = this.password;
        this.loginState.loginState = res;
        this.loginState.token = d.data.token;

        this.appService.toast('登录成功');
        this.navCtrl.setRoot(TabsPage);
      }else{
        console.log('登录失败');
        this.appService.toast('登录失败');
      }
    }, true);
  }

}
