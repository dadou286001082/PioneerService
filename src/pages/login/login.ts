import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {AppService} from "../../providers/app.service";
import {Md5} from "ts-md5/dist/md5";
@Component({
  templateUrl:'login.html',
  selector:'page-login'
})

//登录界面
export class LoginPage{
  errorMessage: string;

  username :string;  //用户名
  password :string;  //密码
  jsonText: any = {
    // mobile:this.username,
    // password : this.password,
    mobile:'18629692029',
    password:'123456',
    //18629692029 code :e8112ee4ec74af7f706a2657754dd663
    // token:9a580777d6fed242ccd12d1be9b3652f userid:7
    code:Md5.hashStr('18629692029'+'poineer_api_nFWn18Wm')
  }

  params: any = {
    route: 'user/user/login',
   jsonText:JSON.stringify(this.jsonText)
  }
  constructor(public navCtrl: NavController,public appService: AppService){

  }

  goToTabs(){
    console.log(this.username+'---'+this.password);
    console.log('---'+JSON.stringify(this.params));
    this.appService.httpPost(this.params, d => {
      // this.res=JSON.stringify(d);
      let res = d.status['succeed'];
      console.log('-----'+res);
      console.log(res=="1");
      if(res=='1'){
        console.log('登录成功');
        this.appService.toast('登录成功');
        this.navCtrl.setRoot(TabsPage);
      }else{
        console.log('登录失败');
        this.appService.toast('登录失败');
      }
    }, true);
  }

}
