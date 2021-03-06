import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HttpModule} from "@angular/http";
import {AppService} from "../providers/app.service";

import {LoginPage} from "../pages/login/login";
import {Loginstate} from "../pages/login/loginstate";

import { MyworklistsPage } from '../pages/myworklists/myworklists';
import {MyworklistsDetailPage} from "../pages/myworklists/myworklists-detail/myworklists-detail";
import {MyworklistDetailData} from "../pages/myworklists/myworklists-detail/myworklist-detail-data";

import {SubmitworksheetPage} from "../pages/submitworksheet/submitworksheet";
import { WorklistapplyPage } from '../pages/worklistapply/worklistapply';
import { MysetsPage } from '../pages/mysets/mysets';
import {MysetsDetailPage} from "../pages/mysets/mysets-detail";
import { TabsPage } from '../pages/tabs/tabs';

import {UserPage} from "../pages/userpage/user/user";
import {UserDetailsPage} from "../pages/userpage/userdetail/userDetails";

import {SettingsPage} from "../pages/userpage/settings/settings";
import {PasswordPage} from "../pages/userpage/passwords/password";
import {AboutusPage} from "../pages/userpage/aboutus/aboutus";
import {UserBase} from "../pages/userpage/user/userbase";
import {UserpageService}from '../pages/userpage/userpage.service/userpage.service';
import {UserParticulars} from "../pages/userpage/user/userparticulars";
import {WelcomePage} from "../pages/welcome/welcome";
import {SetUrl} from "../pages/userpage/settings/setUrl";
import { Camera} from '@ionic-native/camera';//拍照
import { ImagePicker } from '@ionic-native/image-picker';//读取本地照片库

import { FileTransfer} from '@ionic-native/file-transfer';
import {File} from "@ionic-native/file";
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    WelcomePage,
    MyworklistsPage,
    WorklistapplyPage,
    MysetsPage,
    MysetsDetailPage,
    MyworklistsDetailPage,
    SubmitworksheetPage,
    TabsPage,
    UserPage,
    UserDetailsPage,
    SettingsPage,
    PasswordPage,
    AboutusPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true'         //隐藏全部子页面tabs
    }),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    WelcomePage,
    MyworklistsPage,
    WorklistapplyPage,
    MysetsPage,
    MysetsDetailPage,
    MyworklistsDetailPage,
    SubmitworksheetPage,
    TabsPage,
    UserPage,
    UserDetailsPage,
    SettingsPage,
    PasswordPage,
    AboutusPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppService,
    UserpageService,
    UserBase,
    UserParticulars,
    MyworklistDetailData,
    Loginstate,
    SetUrl,
    Camera,
    ImagePicker,
    File,FileTransfer
  ]
})
export class AppModule {}
