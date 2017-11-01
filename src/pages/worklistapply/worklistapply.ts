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
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import {File} from "@ionic-native/file";
import { APP_SERVE_URL} from "../../providers/app.global";

@Component({
  selector: 'page-contact',
  templateUrl: 'worklistapply.html'
})
/**
 * 工单申请
 */
export class WorklistapplyPage {

  jsonText;
  params;
  image;//上传图片参数
  imageBase;//拍照或相册选取返回数据
  work;//申请工单请求参数
  imgurl;//上传图片返回每个图片url
  images=[];//工单申请参数照片数组

  provinceList=[];//省份&id列表
  capital:string;//选择框选中省份
  carnumbser:string;//用户输入的车牌号

  workList=[];//工单类型列表
  works:string;//选择框选中工单类型
  applyReason:string;//工单申请原因
  imgone;//第一张图片
//调用拍照参数
  private options= {
    quality: 50,
    destinationType: 1, // Camera.DestinationType.FILE_URI,
    sourceType: 1, // Camera.PictureSourceType.CAMERA,
    encodingType: 0, // Camera.EncodingType.JPEG,
    mediaType: 0, // Camera.MediaType.PICTURE,
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
    width: 800,
    height: 800,
    quality: 80
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
    console.log("省份"+this.capital+this.carnumbser+this.works+this.applyReason);
    // this.images.push('http://218.244.158.175/xauto_poineer_server/image/catalog/work_sheet_image/work_sheet_image_c7975fa02.jpg');

    this.work={
      province_code_id:this.capital,
      plate_no:this.carnumbser,
      work_sheet_category_id:this.works,
      work_sheet_description:this.applyReason,
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

        this.appService.toast("工单申请成功");
        this.appService.alert(JSON.stringify(this.jsonText));
      }else {
        this.appService.toast("工单申请失败");
      }

    },true)



  }


  ionViewDidLoad(){

    this.params ={
      route:'base/province_code/getProvinceCodeList'
    }
    this.appService.httpPost(this.params,d=>{
      console.log(JSON.stringify(d));
      this.provinceList=d.data['province_code_list'];
    },true)

    this.params ={
      route:'base/work_sheet_category/getWorkSheetCategoryList'
    }
    this.appService.httpPost(this.params,d=>{
      console.log(JSON.stringify(d));
      this.workList=d.data['work_sheet_category_list'];
    },true)


  }



//拍照第一张
  photo1(){
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
        this.images.push(JSON.parse(data.response).data.image_info['thumb']);
        this.appService.alert('上传成功返回：'+JSON.parse(data.response).data.image_info['thumb']);
        this.imgurl=JSON.parse(data.response).data.image_info['thumb'];




      }, (err) => {
        // error
        this.appService.toast('上传失败');
      })

    // this.appService.httpPost(this.params,d　=>{
    //   // console.log(JSON.stringify(d));
    //   // if(d.status.succeed ==1){
    //     // console.log("图片上传成功");
    //     // this.images.push( d.data.image_info['thumb']);
    //     this.appService.alert("图片上传成功返回值为："+ JSON.stringify(d));
    //     // this.imageBase = d.data.image_info['thumb']
    //     // document.getElementById('img1');
    //
    //   // }
    //
    //
    // },true)
  }

  /**
   * 进入个人中心
   */
  onUsers(){
    this.navCtrl.push(UserPage)
  }




}
