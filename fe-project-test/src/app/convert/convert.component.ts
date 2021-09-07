import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css'],
})
export class ConvertComponent implements OnInit {
  isShow = false;
  result: string = '';
  imageSrc: string = '';
  selectedFile!: File;

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }
  onSubmit(formConvert: any) {
    //console.log(formConvert);
    if (formConvert.value.convertType !== 'imagetobase64') {
      this.sendToServer(formConvert);
    }else{
      this.uploadImage();
    }
  }

  sendToServer(formConvert: any) {
    const url = 'http://localhost:8080/api/convert';
    this.http.post(url, formConvert.value).subscribe((response) => {
      console.log(response);
      this.result = JSON.stringify(response);
    });
  }
  onSelectChange(event: any) {
    if (event === 'imagetobase64') {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

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
  uploadImage() {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:8080/api/convert/image', uploadImageData, { observe: 'response' })
      .subscribe((response:any) => {
        if (response.status === 200) {
          console.log('Image uploaded successfully');
        } else {
          console.log('Image uploaded error');
        }
      }
      );
  }
}
