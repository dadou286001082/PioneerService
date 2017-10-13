import { Component } from '@angular/core';
import { NavParams} from 'ionic-angular';

@Component({

  templateUrl:'myworklists-detail.html'
})
export class MyworklistsDetailPage{
  item;

  constructor(params: NavParams) {
    this.item = params.data.item;
  }
}
