
import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";

@Component({
  templateUrl:'welcome.html'
})

//   欢迎页面
export class WelcomePage{
  constructor(public navCtrl:NavController){

  }

  ionViewDidLoad(){
    if(localStorage.getItem('isFirst') =='true'){
      this.navCtrl.setRoot(LoginPage);
    }
  }
  slides = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "assets/img/go.png",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/img/go.png",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/img/bg.jpg",
    }
  ];
  goToHome(){
    var localStorage = window.localStorage;
    localStorage.setItem('isFirst','true');
    this.navCtrl.setRoot(LoginPage);
  }
}
