import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers/*, BaseRequestOptions*/ } from '@angular/http';
import { LoadingController, AlertController, ToastController, Platform } from 'ionic-angular';

@Injectable()
export class UserpageService{

    //����key������
    params: any = {
        device_type: "20", //��Ҫ�滻�� android=20 || ios=10
        device_version: "1.0", //��Ҫ�滻�� ��ǰ�汾��
        version_code: "1", //��Ҫ�滻�� ��ǰ�汾��
        channel: "20001_website",
    }

    constructor(public http: Http, public loadingCtrl: LoadingController,
                private alertCtrl: AlertController, private toastCtrl: ToastController,
                public platform: Platform ) { }

    httpPost(params, callback, loader: boolean = false) {
        let loading = this.loadingCtrl.create();
        if (loader) {
            loading.present();
        }

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = this.encode(this.params) + '&' + this.encode(params);
        //this.logger.log("REQUEST:\n", APP_SERVE_URL, body); //��ӡ��������
        console.log("REQUEST:\n", 'http://218.244.158.175/xauto_poineer_server/xp_service_api/index.php', body);
        this.http.post('http://218.244.158.175/xauto_poineer_server/xp_service_api/index.php', body, { headers: headers }).toPromise()
            .then(
                res => {
                var d = res.json();
                //this.logger.log("RESULT:", res); //��ӡ��������
                console.log("RESULT:", res);
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

    ////��ʱ���ã��ӿھ�Ϊ post ����
    //httpGet(url, params, callback, loader: boolean = false) {
    //  let loading = this.loadingCtrl.create({});
    //  if (loader) {
    //    loading.present();
    //  }
    //  this.http.get(APP_SERVE_URL + url + this.encode(params))
    //    .toPromise()
    //    .then(res => {
    //      var d = res.json();
    //      if (loader) {
    //        loading.dismiss();
    //      }
    //      callback(d == null ? "[]" : d);
    //    })
    //    .catch(error => {
    //      if (loader) {
    //        loading.dismiss();
    //      }
    //      this.handleError(error);
    //    });
    //}

    private handleError(error: Response | any) {
        let msg = '';
        if (error.status == 400) {
            msg = '������Ч(code��404)';
            //this.logger.log('������������Ƿ�ƥ��');
            console.log('������������Ƿ�ƥ��');
        }
        if (error.status == 404) {
            msg = '������Դ������(code��404)';
            //this.logger.error(msg + '������·���Ƿ���ȷ');
            console.log(msg + '������·���Ƿ���ȷ');
        }
        if (error.status == 500) {
            msg = '��������������(code��500)';
            //this.logger.error(msg + '������·���Ƿ���ȷ');
            console.log(msg + '������·���Ƿ���ȷ');
        }
        console.log(error);
        //this.logger.error(error);
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

    // �Բ������б���
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
                title: '��ʾ',
                message: message,
                buttons: [{
                    text: "ȷ��",
                    handler: data => {
                        callback();
                    }
                }]
            });
            alert.present();
        } else {
            let alert = this.alertCtrl.create({
                title: '��ʾ',
                message: message,
                buttons: ["ȷ��"]
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
            //this.logger.error("window.localStorage error:" + e);
        }
    }
    getItem(key: string, callback) {
        try {
            var json = window.localStorage[key];
            var obj = JSON.parse(json);
            callback(obj);
        }
        catch (e) {
            //this.logger.error("window.localStorage error:" + e);
        }
    }
}
