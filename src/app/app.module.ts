import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HttpModule} from "@angular/http";


import { MyworklistsPage } from '../pages/myworklists/myworklists';
import {MyworklistsDetailPage} from "../pages/myworklists/myworklists-detail/myworklists-detail";
import { WorklistapplyPage } from '../pages/worklistapply/worklistapply';
import { MysetsPage } from '../pages/mysets/mysets';
import {MysetsDetailPage} from "../pages/mysets/mysets-detail";
import { TabsPage } from '../pages/tabs/tabs';

import {MysetsService} from "../pages/mysets/mysets.service/mysets.service";
import {MyworklistsService} from "../pages/myworklists/myworklists.service/myworklists.service";


@NgModule({
  declarations: [
    MyApp,
    MyworklistsPage,
    WorklistapplyPage,
    MysetsPage,
    MysetsDetailPage,
    MyworklistsDetailPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyworklistsPage,
    WorklistapplyPage,
    MysetsPage,
    MysetsDetailPage,
    MyworklistsDetailPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MysetsService,
    MyworklistsService
  ]
})
export class AppModule {}
