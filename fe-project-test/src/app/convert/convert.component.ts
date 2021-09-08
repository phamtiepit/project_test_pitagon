import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css'],
})
export class ConvertComponent implements OnInit {
  isBase64: string = '';
  isShow = false;
  isShowImage = false;
  result: string = '';
  resultImageString: string = '';
  imageSrc: string = '';
  imageString: string = '';
  selectedFile!: File;

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  //Submit Form Data
  onSubmit(formConvert: any) {
    //console.log(formConvert);
    if (formConvert.value.convertType === 'imagetobase64') {
      this.uploadImage();
    }else if(formConvert.value.convertType === 'base64toimage'){
      this.showImage(formConvert.value.base64String);
    }else{
      this.sendToServer(formConvert);
    }
  }


  //Send data to REST API
  sendToServer(formConvert: any) {
    const url = 'http://localhost:8080/api/convert';
    this.http.post(url, formConvert.value).subscribe((response) => {
      //console.log(response);
      if(response =='invalid') {
        this.isBase64 = 'Base64 String Invalid';
      }else{
        this.result = JSON.stringify(response);
        this.isBase64 = '';
      }
    });
  }

  //Event Select Listener
  onSelectChange(event: any) {
    if (event === 'imagetobase64') {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
    if(event === 'base64toimage'){
      this.isShowImage = true;
    }else{
      this.isShowImage = false;
    }
  }

  //Event File Change
  onFileChange(event: any) {
    //console.log(event);
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.selectedFile = file;
      reader.onload = (event: any) => {
        this.imageSrc = event.target.result;
      }
      reader.readAsDataURL(file);
    }
  }

  // Upload File with API
  uploadImage() {
    //console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:8080/api/convert/image', uploadImageData, { observe: 'response' })
      .subscribe((response:any) => {
        if (response.status === 200) {
          //console.log(response.body);
          console.log('Image uploaded successfully');
          this.resultImageString = JSON.stringify(response.body);
        } else {
          console.log('Image uploaded error');
        }
      }
      );
  }
  //Get Image From Base64 String
  showImage(imgString: any) {
    this.imageString = imgString.replace(/^"(.*)"$/, '$1');
  }
}
