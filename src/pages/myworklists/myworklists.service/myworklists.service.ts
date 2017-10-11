import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class MyworklistsService{
  data:string;
  constructor(public http:Http){
    console.log('myworklistsservice');
  }

  public getMyworkLists():Observable<string>{
    return this.http.get("assets/json/look_list.json").map(res=>res.json().content);
  }
}
