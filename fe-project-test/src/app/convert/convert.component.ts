import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css']
})
export class ConvertComponent implements OnInit {

  isShow = false;
  result: string =''


  constructor(private http:HttpClient) {}

  ngOnInit(): void {
  }
  onSubmit(formConvert:any){
    console.log(formConvert);
    //this.sendToServer(formConvert);
  }

  sendToServer(formConvert:any){
    const url = "http://localhost:8080/api/convert";
    this.http.post(url, formConvert.value)
    .subscribe(response => {console.log(response)
      this.result =  JSON.stringify(response);

    });
  }
  onChange(event:any){
    //console.log(event);
    if(event === 'imagetobase64' || event === 'base64toimage'){
      this.isShow = true;
    }else{
      this.isShow = false;
    }
  }

}
