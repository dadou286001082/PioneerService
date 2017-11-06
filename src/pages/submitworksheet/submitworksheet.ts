import {Component} from "@angular/core";
import {NavController,NavParams} from "ionic-angular";
import {AppService} from "../../providers/app.service";
import {Loginstate} from "../login/loginstate";
import { AlertController } from 'ionic-angular';
import { ActionSheetController,Platform } from "ionic-angular";//底部弹出框
import { Camera, CameraOptions } from '@ionic-native/camera';//拍照
import { ImagePicker } from '@ionic-native/image-picker';//读取本地照片库
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';//文件上传
import {File} from "@ionic-native/file";//文件读取
import  {APP_SERVE_URL} from "../../providers/app.global";
import {MyworklistDetailData} from "../myworklists/myworklists-detail/myworklist-detail-data";

@Component({
  templateUrl:'submitworksheet.html'
})
//提交完成后的工单
export class SubmitworksheetPage{
  jsonText;
  params;
  num;//点击拍照按钮是哪个参数（1-6）
  imageBase;//拍照或相册选取返回数据
  images=[];//工单提交参数照片数组
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
//调用拍照参数
  private options= {
    quality: 10,
    destinationType: 1, // Camera.DestinationType.FILE_URI,
    sourceType: 1, // Camera.PictureSourceType.CAMERA,
    encodingType: 0, // Camera.EncodingType.JPEG,
    mediaType: 0, // Camera.MediaType.PICTURE,
    width: 80,
    height: 80,
    // allowEdit: true,
    correctOrientation: true
    // quality: 100,
    // destinationType: this.camera.DestinationType.FILE_URI,
    // encodingType: this.camera.EncodingType.JPEG,
    // mediaType: this.camera.MediaType.PICTURE
  }
  // 调用相册时传入的参数
  private imagePickerOpt = {
    maximumImagesCount: 1,//选择一张图片
    width: 80,
    height: 80,
    quality: 50
  };


  item;
  remark:string;//工单申请原因
  constructor(public navCtrl: NavController, navParams: NavParams,
              public appService: AppService,
              public loginState:Loginstate,
              public myworklistDetailData:MyworklistDetailData,
              public imagePicker :ImagePicker,//获取图库
              private transfer: FileTransfer,//文件上传下载
              public file:File, //文件存储
              public  camera:Camera,//拍照
              private actionSheetCtrl: ActionSheetController//底部弹出框
  ){
    this.item = navParams;
    console.log("item = "+JSON.stringify(this.item));
  }
  fileTransfer: FileTransferObject = this.transfer.create();//初始化文件上传对象

  //确认提交工单 上传数据
 submit(){

   this.jsonText={
     user_id:this.loginState.loginUserId,
     work_sheet_no:this.myworklistDetailData.work_sheet_no,
     work_sheet_comment:this.remark,
     image_list:this.images

   };
   this.params ={
     route:'work_sheet/work_sheet/submitWorkSheet',
     token:this.loginState.token,
     jsonText:JSON.stringify(this.jsonText),
   }
   this.appService.httpPost(this.params,d=>{
     if(d.status['succeed']==1){

       this.appService.toast("工单提交成功");
       this.photoInitial1 ='assets/img/tianjia.png';
       this.photoInitial2 ='assets/img/tianjia.png';
       this.photoInitial3 ='assets/img/tianjia.png';
       this.photoInitial4 ='assets/img/tianjia.png';
       this.photoInitial5 ='assets/img/tianjia.png';
       this.photoInitial6 ='assets/img/tianjia.png';
       this.images.length =0;//清空照片数组


     }else {
       this.appService.toast("工单提交失败");
     }

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
        // this.appService.alert("上传返回"+JSON.stringify(data)+"-----"+this.params);
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


}
