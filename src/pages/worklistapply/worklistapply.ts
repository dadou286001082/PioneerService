import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserPage} from "../userpage/user/user";
import {UserParticulars} from "../userpage/user/userparticulars";
import {AppService} from "../../providers/app.service";
import { Camera, CameraOptions } from '@ionic-native/camera';//拍照
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';//文件
import { ImagePicker } from '@ionic-native/image-picker';//读取本地照片库
import { ActionSheetController,Platform } from "ionic-angular";
import { AlertController } from 'ionic-angular';
import {Loginstate} from "../login/loginstate";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';//文件上传
import {File} from "@ionic-native/file";//文件读取
import { APP_SERVE_URL} from "../../providers/app.global";

@Component({
  selector: 'page-contact',
  templateUrl: 'worklistapply.html'
})
/**
 * 工单申请
 */
export class WorklistapplyPage {
  returnCarNum =''; //返回的车牌号
  returnCarMark=''; //返回的车牌编号
  returnPark='';//返回停车场名称
  stateCar =false;//m默认不显示车辆信息

  selectCar;//车牌默认显示 陕
  num;//点击拍照按钮是哪个参数（1-6）

  dele1:boolean=false;//删除照片按钮默认不显示，false
  dele2:boolean=false;
  dele3:boolean=false;
  dele4:boolean=false;
  dele5:boolean=false;
  dele6:boolean=false;
  photoInitial1 ='assets/img/tianjia.png';
  photoInitial2 ='assets/img/tianjia.png';
  photoInitial3 ='assets/img/tianjia.png';
  photoInitial4 ='assets/img/tianjia.png';
  photoInitial5 ='assets/img/tianjia.png';
  photoInitial6 ='assets/img/tianjia.png';
  jsonText;
  params;
  image;//上传图片参数
  imageBase;//拍照或相册选取返回数据
  work;//申请工单请求参数
  images=[];//工单申请参数照片数组
  remark:string='';//工单申请原因
  provinceList=[];//省份&id列表
  capital:string;//选择框选中省份
  carnumbser:string='';//用户输入的车牌号

  workList=[];//工单类型列表
  works:string='';//选择框选中工单类型
  applyReason:string;//工单申请原因
  imgone;//第一张图片
//调用拍照参数
  private options= {
    quality: 10,
    destinationType: 1, // Camera.DestinationType.FILE_URI,
    sourceType: 1, // Camera.PictureSourceType.CAMERA,
    encodingType: 0, // Camera.EncodingType.JPEG,
    mediaType: 0, // Camera.MediaType.PICTURE,
    Width: 160,
    Height: 160,
    allowEdit: true,

    correctOrientation: true
    // quality: 100,
    // destinationType: this.camera.DestinationType.FILE_URI,
    // encodingType: this.camera.EncodingType.JPEG,
    // mediaType: this.camera.MediaType.PICTURE
  }
  // 调用相册时传入的参数
  private imagePickerOpt = {
    maximumImagesCount: 1,//选择一张图片
    allowEdit: true,

    quality: 50
  };
  constructor(public navCtrl: NavController,public userParticulars:UserParticulars,public appService:AppService,
              public  camera:Camera,private actionSheetCtrl: ActionSheetController,public alerCtrl: AlertController,
              public imagePicker :ImagePicker,public loginstate:Loginstate,public platform:Platform,private transfer: FileTransfer,
              public file:File
  ) {

  }
  fileTransfer: FileTransferObject = this.transfer.create();


//工单申请
  workOk(){
      // var s =  document.getElementById('inputs').nodeValue;
   if(this.carnumbser.length==0){
     this.appService.toast("请输入车牌号")
    }
   else if(this.works.length==0){

     this.appService.toast("请输入工单类型")
   }
   else if(this.remark.length==0){

     this.appService.toast("请输入申请原因")
    }
  else{



    console.log("省份"+this.capital+"---"+this.carnumbser+"---"+this.works+"---"+this.remark);
    // this.images.push('http://218.244.158.175/xauto_poineer_server/image/catalog/work_sheet_image/work_sheet_image_c7975fa02.jpg');

    this.work={
      province_code_id:this.capital,
      plate_no:this.carnumbser,
      work_sheet_category_id:this.works,
      work_sheet_description:this.remark,
      image_list:this.images
    };
    this.jsonText={
      user_id:this.loginstate.loginUserId,
      work_sheet_info:this.work

    }
    this.params ={
      route:'work_sheet/work_sheet/applyWorkSheet',
      token:this.loginstate.token,
      jsonText:JSON.stringify(this.jsonText),
    };

    this.appService.httpPost(this.params,d=>{
      console.log(JSON.stringify(d));
      if(d.status['succeed']==1){
      //隐藏删除按钮
        this.dele1=false;
        this.dele2=false;
        this.dele3=false;
        this.dele4=false;
        this.dele5=false;
        this.dele6=false;

        this.appService.toast("工单申请成功");
        this.stateCar=false;//隐藏车辆信息
        this.carnumbser='';//清空车牌号
        this.works='';//清空工单列表
        this.remark='';//清空申请原因
        // this.appService.alert("工单申请成功"+JSON.stringify(this.jsonText));
        this.photoInitial1 ='assets/img/tianjia.png';
        this.photoInitial2 ='assets/img/tianjia.png';
        this.photoInitial3 ='assets/img/tianjia.png';
        this.photoInitial4 ='assets/img/tianjia.png';
        this.photoInitial5 ='assets/img/tianjia.png';
        this.photoInitial6 ='assets/img/tianjia.png';
        this.images.length =0;//清空照片数组


      }else {
        this.appService.toast("工单申请失败!"+JSON.stringify(d.status.error_desc));




        // this.appService.alert("工单申请失败"+JSON.stringify(this.jsonText));
      }

    },true)

   }

  }


  ionViewDidLoad(){



    //获取车牌省份
    this.params ={
      route:'base/province_code/getProvinceCodeList'
    }
    this.appService.httpPost(this.params,d=>{
      console.log(JSON.stringify(d));
      this.provinceList=d.data['province_code_list'];
      this.capital=d.data['province_code_list'][0].province_code_id;//默认车牌为 陕
      // this.selectCar=d.data['province_code_list'][0].province_code_name;
      // console.log("车牌默认"+d.data['province_code_list'][0].province_code_id+"----"+this.capital);
    },true)

    //获取工单类型
    this.params ={
      route:'base/work_sheet_category/getWorkSheetCategoryList'
    }
    this.appService.httpPost(this.params,d=>{
      console.log(JSON.stringify(d));
      this.workList=d.data['work_sheet_category_list'];
    },true)


  }



//拍照第一张
  photo1(nu){

    this.num=nu;
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: '拍照',
          // role: 'destructive',
          // icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log("拍照第一张");

            this.camera.getPicture(this.options).then((imageData) => {
              // imageData is either a base64 encoded string or a file URI
              // If it's base64:
              // this.appService.alert("拍照"+imageData);
              // this.imageBase = 'data:image/jpeg;base64,' + imageData;
              this.imageBase = imageData;
              this.upPhoto();
            }, (err) => {
              // Handle error
            });
          }
        },
        {
          text: '从相册选取',
          // icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('从相册选取第一张');
            this.imagePicker.getPictures(this.imagePickerOpt).then((results) => {
              for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
                this.imageBase=results[i];
                this.upPhoto();
              }
            }, (err) => { });
          }
        },
        {
          text: '取消',
          // icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            console.log('取消');
          }
        },


      ]
    });
    actionSheet.present();

  }
//上传图片
  upPhoto(){
    // this.appService.alert("上传图片:"+this.imageBase);
    this.jsonText={
      image_type:'16',

    };
    this.params ={
      route:'base/tools/editImage',
      jsonText:JSON.stringify(this.jsonText),
      // image:this.imageBase
      device_type: "20", //需要替换成 android=20 || ios=10
      device_version: "1.0", //需要替换成 当前版本号
      version_code: "1", //需要替换成 当前版本号
      channel: "20001_website",
    }

    let options: FileUploadOptions = {
      fileKey: 'image',
      fileName: 'name.jpg',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' //不加入 发生错误！！
      },
      params:this.params
    }

    this.fileTransfer.upload(this.imageBase, encodeURI(APP_SERVE_URL)
      , options)
      .then((data) => {
        this.appService.toast('上传成功');

        //照片添加到数组
        this.images.push(JSON.parse(data.response).data.image_info['source']);



if(this.num==1){
  this.dele1=true;//上传成功显示删除按钮
  this.photoInitial1=JSON.parse(data.response).data.image_info['source'];

}
else if (this.num==2){
  this.dele2=true;
  this.photoInitial2=JSON.parse(data.response).data.image_info['source'];
}
else if (this.num==3){
  this.dele3=true;
  this.photoInitial3=JSON.parse(data.response).data.image_info['source'];
}
else if (this.num==4){
  this.dele4=true;
  this.photoInitial4=JSON.parse(data.response).data.image_info['source'];
}
else if (this.num==5){
  this.dele5=true;
  this.photoInitial5=JSON.parse(data.response).data.image_info['source'];
}
else if (this.num==6){
  this.dele6=true;
  this.photoInitial6=JSON.parse(data.response).data.image_info['source'];
}

      }, (err) => {
        // error
        this.appService.toast('上传失败');
      })


  }

  /**
   * 删除照片
   */
  deletes(de){

if(de==1){
  this.photoInitial1 ='assets/img/tianjia.png';
  this.dele1=false;//点击删除按钮，删除照片，同时隐藏删除按钮
  this.images.splice(0,1);

}
else if(de==2){
  this.photoInitial2 ='assets/img/tianjia.png';
  this.dele2=false;
  this.images.splice(1,1);
}
else if(de==3){
  this.photoInitial3 ='assets/img/tianjia.png';
  this.dele3=false;
  this.images.splice(2,1);
}
else if(de==4){
  this.photoInitial4 ='assets/img/tianjia.png';
  this.dele4=false;
  this.images.splice(3,1);
}
else if(de==5){
  this.photoInitial5='assets/img/tianjia.png';
  this.dele5=false;
  this.images.splice(4,1);
}
else if(de==6){
  this.photoInitial6 ='assets/img/tianjia.png';
  this.dele6=false;
  this.images.splice(5,1);
}

  }

  /**
   * 进入个人中心
   */
  onUsers(){
    this.navCtrl.push(UserPage)
  }
  //
  // //失去焦点
  // blurInput(){
  //   console.log("blur");
  //
  // }
  // //获取焦点
  // focusInput(){
  //   // if(this.carnumbser.length==6){
  //   //   console.log("车牌出入");
  //   // }
  //   console.log("focus");
  //
  // }
  //车牌输入6个字符请求服务器
  onChange(){

    if(this.carnumbser.length==6){
      console.log("onchan");
      console.log(this.carnumbser);

      this.jsonText={
        user_id:this.loginstate.loginUserId,
        province_code_id:this.capital,
        plate_no:this.carnumbser

      };
      this.params ={
        route:'car/car/getCarInfo',
        token:this.loginstate.token,
        jsonText:JSON.stringify(this.jsonText),
      };
      this.appService.httpPost(this.params,d=>{
        console.log(JSON.stringify(d));
        if(d.data.car_info==''){
          this.appService.toast("未找到此车牌号")
          this.stateCar =false;
          console.log("没有这辆车");
        }else{
          console.log("有这辆车");

        this.returnCarNum=d.data.car_info['plate_no'];
        this.returnCarMark=d.data.car_info['car_no'];
        this.returnPark=d.data.car_info.car_parking_site_info['parking_site_name'];
        this.stateCar=true;
        console.log(this.returnCarNum+this.returnCarMark+this.returnPark);
        }

      },true);

    }

  }


}
