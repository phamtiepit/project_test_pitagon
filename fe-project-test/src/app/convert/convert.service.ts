import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable()

export class ConvertService{


  constructor(private http: HttpClient){}

  sendPostStringEncode(value:any){
    return this.http.post(environment.apiUrl+'encodeString', value);
  }
  sendPostStringDecode(value:any){
    return this.http.post(environment.apiUrl+'decodeString', value);
  }
  sendPostImage(value:any){
    return this.http.post(environment.apiUrl+'endcodeImage', value, { observe: 'response' });
  }
  getImageString(value:any){
    return this.http.post(environment.apiUrl+'getImage', value);
  }

}
