import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AboutusPage} from "../aboutus/aboutus";

@Component({
  selector: 'page-seting',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController) {
  }
  aboutUs(){
    this.navCtrl.push(AboutusPage);
  }
//  app.controller('MessageCtrl', function ($scope, $state, $window) {
//  $scope.call = function (phone) {
//    $window.location.href = "tel:" + phone;
//  }
//});

}
