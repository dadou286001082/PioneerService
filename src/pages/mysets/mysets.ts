import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {MysetsDetailPage} from "./mysets-detail";
import {MysetsService} from "./mysets.service/mysets.service";

@Component({
  selector: 'page-home',
  templateUrl: 'mysets.html'
})
export class MysetsPage {
  index;
  items = [];
  errorMessage: string;


  constructor(public nav: NavController,public navParams: NavParams, public mysetsService:MysetsService) {
    // this.items = [
    //   {
    //     'title': '测试站点001-东郊',
    //     'icon': '金花北路',
    //     'description': '0个',
    //     'color': '#E63135'
    //   },
    //   {
    //     'title': '测试站点002-西郊',
    //     'icon': '太白南路',
    //     'description': '1个',
    //     'color': '#0CA9EA'
    //   },
    //   {
    //     'title': '测试站点003-南郊',
    //     'icon': '西稍门',
    //     'description': '2个',
    //     'color': '#F46529'
    //   },
    //   {
    //     'title': '测试站点004-北郊',
    //     'icon': '龙首村',
    //     'description': '3个',
    //     'color': '#FFD439'
    //   },
    //   {
    //     'title': '测试站点005-城内',
    //     'icon': '钟楼',
    //     'description': '4个',
    //     'color': '#CE6296'
    //   },
    //
    // ]
  }
  ionViewDidLoad() {
    this.index = this.navParams.get('item');
    console.log('index' + this.index);
    this.loadData();
  }

  private loadData(){
    this.mysetsService.getMysets().subscribe(countries =>this.items =<any>countries,
      error =>this.errorMessage = <any>error,
      )
  }
  doRefresh(refresher) {
    this.loadNetData(refresher);
  }
  private loadNetData(refresher: any) {
    this.mysetsService.getMysets().subscribe(
      countries => this.items = <any>countries,
      error => this.errorMessage = <any>error,
      function complete() {
        refresher.complete();
      },
    );
  }
  openNavDetailsPage(item) {
    this.nav.push(MysetsDetailPage, { item: item });
  }
}
