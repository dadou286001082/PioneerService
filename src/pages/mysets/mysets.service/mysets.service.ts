import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http,Response} from "@angular/http";

// export class Mysets{
//   constructor(public set:string,public addr:string,public num:number){}
// }
// const MYSETS =[
//   new Mysets('东郊001','金华路1',1),
//   new Mysets('洗郊002','金华路2',2),
//   new Mysets('南郊003','金华路3',3),
//   new Mysets('北郊004','金华路4',4)
// ];

@Injectable()
export class MysetsService{

constructor(public http:Http){
  console.log('mysets.service');
}

public getMysets():Observable<string>{
  return this.http.get('http://rapapi.org/mockjsdata/18396/api/discove/goodlist').
  map(this.extractData).catch(this.handleError);
}

  private  extractData(res: Response) {
    let body = res.json().data;
    return body || {};
  }
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  // getMysets(){return Observable.of(MYSETS);}
  //
  // getMyset(set:string){
  //   return this.getMysets().map(mysets=>mysets.find(myset=>myset.set=== set));
  // }
}
