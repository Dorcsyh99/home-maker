import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss']
})
export class UploadAvatarComponent implements OnInit {

  ngOnInit(): void {
  }

  selectedFile: ImageSnippet | undefined;



  constructor(private authService: AuthService){}

  processFile(imageInput: any){
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    const userId = localStorage.getItem("userId");

    console.log(userId);

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.authService.uploadAvatar(userId as string, this.selectedFile.file).subscribe( (res: any) => {
          console.log("success ", res);
        })
    });

    reader.readAsDataURL(file);
  }



}
