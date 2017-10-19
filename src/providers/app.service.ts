import { APP_SERVE_URL } from './app.global';
import { LoadingController, AlertController, ToastController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Response, Headers/*, BaseRequestOptions*/ } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {

    //缓存key的配置
    params: any = {
        device_type: "20", //需要替换成 android=20 || ios=10
        device_version: "1.0", //需要替换成 当前版本号
        version_code: "1", //需要替换成 当前版本号
        channel: "20001_website",
    }

    constructor(public http: Http, public loadingCtrl: LoadingController,
        private alertCtrl: AlertController, private toastCtrl: ToastController,
        public platform: Platform) { }

    httpPost(params, callback, loader: boolean = false) {
        let loading = this.loadingCtrl.create();
        if (loader) {
            loading.present();
        }

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = this.encode(this.params) + '&' + this.encode(params);
        console.log("REQUEST:\n", APP_SERVE_URL, body); //打印请求数据

        this.http.post(APP_SERVE_URL, body, { headers: headers }).toPromise()
            .then(
                res => {
                    var d = res.json();
                  console.log("RESULT:", res); //打印返回数据
                    if (loader) {
                        loading.dismiss();
                    }
                    callback(d == null ? "[]" : d);
                }).catch(error => {
                    if (loader) {
                        loading.dismiss();
                    }
                    this.handleError(error);
                }
            );
    }

    //暂时无用，接口均为 post 请求
    httpGet(url, params, callback, loader: boolean = false) {
        let loading = this.loadingCtrl.create({});
        if (loader) {
            loading.present();
        }
        this.http.get(APP_SERVE_URL + url + this.encode(params))
            .toPromise()
            .then(res => {
                var d = res.json();
                if (loader) {
                    loading.dismiss();
                }
                callback(d == null ? "[]" : d);
            })
            .catch(error => {
                if (loader) {
                    loading.dismiss();
                }
                this.handleError(error);
            });
    }

    private handleError(error: Response | any) {
        let msg = '';
        if (error.status == 400) {
            msg = '请求无效(code：404)';
          console.log('请检查参数类型是否匹配');
        }
        if (error.status == 404) {
            msg = '请求资源不存在(code：404)';
          console.log(msg + '，请检查路径是否正确');
        }
        if (error.status == 500) {
            msg = '服务器发生错误(code：500)';
          console.log(msg + '，请检查路径是否正确');
        }
      console.log(error);
        if (msg != '') {
            this.toast(msg);
        }
    }

    // private handleError(error: Response | any) {
    //     // In a real world app, we might use a remote logging infrastructure
    //     let errMsg: string;
    //     if (error instanceof Response) {
    //         const body = error.json() || '';
    //         const err = body.error || JSON.stringify(body);
    //         errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    //     } else {
    //         errMsg = error.message ? error.message : error.toString();
    //     }
    //     console.error(errMsg);
    //     return Observable.throw(errMsg);
    // }

    // 对参数进行编码
    encode(params) {
        var str = '';
        if (params) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var value = params[key];
                    str += key + '=' + value + '&';
                }
            }
            str = str.substring(0, str.length - 1);
        }
        return str;
    }

    alert(message, callback?) {
        if (callback) {
            let alert = this.alertCtrl.create({
                title: '提示',
                message: message,
                buttons: [{
                    text: "确定",
                    handler: data => {
                        callback();
                    }
                }]
            });
            alert.present();
        } else {
            let alert = this.alertCtrl.create({
                title: '提示',
                message: message,
                buttons: ["确定"]
            });
            alert.present();
        }
    }

    toast(message, callback?) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            dismissOnPageChange: true,
        });
        toast.present();
        if (callback) {
            callback();
        }
    }

    setItem(key: string, obj: any) {
        try {
            var json = JSON.stringify(obj);
            window.localStorage[key] = json;
        }
        catch (e) {
          console.log("window.localStorage error:" + e);
        }
    }
    getItem(key: string, callback) {
        try {
            var json = window.localStorage[key];
            var obj = JSON.parse(json);
            callback(obj);
        }
        catch (e) {
          console.log("window.localStorage error:" + e);
        }
    }
}
