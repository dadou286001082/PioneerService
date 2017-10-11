import { Component } from '@angular/core';
import {NavParams } from 'ionic-angular';

@Component({
  templateUrl:'mysets-detail.html'
})

export class MysetsDetailPage {
  item;

  constructor(params: NavParams) {
    this.item = params.data.item;
  }
}

