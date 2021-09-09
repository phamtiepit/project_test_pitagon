import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()

export class ConvertService{
  baseUrl : string = 'http://localhost:8080/api/convert/';

  constructor(private http: HttpClient){}

  sendPostStringEncode(value:any){
    return this.http.post(this.baseUrl+'encodeString', value);
  }
  sendPostStringDecode(value:any){
    return this.http.post(this.baseUrl+'decodeString', value);
  }
  sendPostImage(value:any){
    return this.http.post(this.baseUrl+'endcodeImage', value, { observe: 'response' });
  }
  getImageString(value:any){
    return this.http.post(this.baseUrl+'getImage', value);
  }

}
