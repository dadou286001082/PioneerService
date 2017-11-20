import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {AppService} from "../../providers/app.service";
import {Md5} from "ts-md5/dist/md5";
import {Loginstate} from "./loginstate";
import {FormGroup } from '@angular/forms';//表单验证

@Component({
  templateUrl:'login.html',
  selector:'page-login'
})

//登录界面
export class LoginPage{
  errorMessage: string;
  //表单验证

  username ='';  //用户名
  password ='';  //密码
  jsonText;
  params;
  //记住账号密码
  nam:string;
  pas:string;
  constructor(public navCtrl: NavController,public appService: AppService,public loginState:Loginstate,
              ){
  }


  goToTabs(){
    console.log(this.username+"----"+this.password);
  if(this.username ==''){
    this.appService.toast("请输入用户名");
  return;
  }else if(this.password ==''){
    this.appService.toast("请输入密码");
    return;
  }else{
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

    this.appService.httpPost(this.params, d => {
      // this.res=JSON.stringify(d);
      let res = d.status['succeed'];
      if(res=='1'){
        var localStorage = window.localStorage;
        localStorage.setItem('name', this.username);
        localStorage.setItem('pasword', this.password);
        // console.log('-----'+res);
        // console.log('-----'+ d.data.token);
        //记住账号密码

        console.log('登录成功');
        //如果登录成功，保存登录信息
        this.loginState.loginName = this.username;
        this.loginState.loginPWD = this.password;
        this.loginState.loginState = res;
        this.loginState.token = d.data.token;
        this.loginState.loginUserId=d.data['user_id'];

        this.appService.toast('登录成功');
        this.navCtrl.setRoot(TabsPage);
      }else{
        console.log('登录失败');
        this.appService.toast('用户名或密码错误');
        return;
      }
    }, true);
  }

  }

ionViewDidLoad(){
  //记住账号密码
this.nam=localStorage.getItem('name');
this.pas=localStorage.getItem('pasword');

  if(localStorage.getItem('name')!=null && localStorage.getItem('pasword')!=null){
    console.log("------name"+ this.nam);
    console.log("------pas"+ this.pas);
    this.jsonText  = {
      mobile:this.nam,
      password : this.pas,
      // mobile:'18629692029',
      // password:'123456',
      //18629692029 code :e8112ee4ec74af7f706a2657754dd663
      // token:9a580777d6fed242ccd12d1be9b3652f userid:7
      code:Md5.hashStr(this.nam+'poineer_api_nFWn18Wm')
    }

    this. params = {
      route: 'user/user/login',
      jsonText:JSON.stringify(this.jsonText)
    }



    // console.log(this.username+'---'+this.password);
    // console.log('---'+JSON.stringify(this.params));
    this.appService.httpPost(this.params, d => {
      // this.res=JSON.stringify(d);
      let res = d.status['succeed'];
      console.log('-----'+res);
      console.log('-----'+ d.data.token);
      if(res=='1'){
        console.log('登录成功');
        //如果登录成功，保存登录信息
        this.loginState.loginName = this.nam;
        this.loginState.loginPWD = this.pas;
        this.loginState.loginState = res;
        this.loginState.token = d.data.token;
        this.loginState.loginUserId=d.data['user_id'];

        this.appService.toast('登录成功');

        //记住登录状态
        this.jsonText  = {
          user_id:this.loginState.loginUserId

        };
        this. params = {
          route: 'user/user/loginWithToken',
          token:this.loginState.token,
          jsonText:JSON.stringify(this.jsonText)
        };
      this.appService.httpPost(this.params,d=>{
        console.log("记住登录---"+JSON.stringify(d));

      },true);


        this.navCtrl.setRoot(TabsPage);



      }else{
        console.log('登录失败');
        this.appService.toast('登录失败');
      }
    }, true);




  }
}


}
