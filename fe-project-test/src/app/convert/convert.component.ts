import { Component, OnInit } from '@angular/core';
import {ConvertService} from './convert.service';


@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css'],
  providers: [ConvertService],
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

  constructor(private convertService: ConvertService) { }

  ngOnInit(): void { }

  //Submit Form Data
  onSubmit(formConvert: any) {
    //console.log(formConvert);
    switch (formConvert.value.convertType) {
      case 'stringtobase64':
        this.encodeString(formConvert);
        break;
      case 'base64tostring':
        this.decodeString(formConvert);
        break;
      case 'imagetobase64':
        this.encodeImage();
        break;
      case 'base64toimage':
        this.getImage(formConvert);
        break;
    }
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

  encodeString(formConvert: any) {
    this.convertService.sendPostStringEncode(formConvert.value).subscribe((response) => {
          //console.log(response);
          this.result = JSON.stringify(response);
        });
  }
  decodeString(formConvert: any) {
    this.convertService.sendPostStringDecode(formConvert.value).subscribe((response) => {
      //console.log(response);
      if(response =='invalid') {
        this.isBase64 = 'Base64 String Invalid';
      }else{
        this.result = JSON.stringify(response);
        this.isBase64 = '';
      }
    });
  }
  encodeImage() {
    //console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.convertService.sendPostImage(uploadImageData)
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
  getImage(formConvert: any) {
    //console.log(formConvert);
    this.convertService.getImageString(formConvert.value).subscribe((response) => {
      //console.log(response);
      this.imageString = JSON.stringify(response).replace(/^"(.*)"$/, '$1');
    });
  }
}
