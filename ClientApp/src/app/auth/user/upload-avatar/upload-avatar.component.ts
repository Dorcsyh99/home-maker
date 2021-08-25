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
  userId: string = this.authService.getUserId();

  constructor(private authService: AuthService){}

  processFile(imageInput: any){
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.authService.uploadAvatar(this.userId, this.selectedFile.file).subscribe( (res: any) => {
          console.log("success ", res);
        })
    });

    reader.readAsDataURL(file);
  }



}
