import { Component, OnInit } from '@angular/core';
import { Post } from './post';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { UploadpostService } from './uploadpost.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  post: Post;

  uploadForm: FormGroup;

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  constructor(private fb: FormBuilder, private uploadPostService: UploadpostService) {
    this.post = new Post();
  }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      document: [null, null],
     // document: new FormControl(null, [Validators.required, this.requiredFileType('png')]),
      //document2: new FormControl(null, [Validators.required, this.requiredFileType('png')]),
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
      //image: new FormControl(null, [Validators.required, requiredFileType('png')])
    });
  }
  // requiredFileType(type: string) {
  //   return function (control: FormControl) {
  //     const file = control.value;
  //     if (file) {
  //       const extension = file.name.split('.')[1].toLowerCase();
  //       if (type.toLowerCase() !== extension.toLowerCase()) {
  //         return {
  //           requiredFileType: true
  //         };
  //       }

  //       return null;
  //     }

  //     return null;
  //   };
  // }

  isValid(controlName) {
    return this.uploadForm.get(controlName).invalid && this.uploadForm.get(controlName).touched;
  }
  uploadSubmit() {
debugger;
    if (!this.post.title && !this.post.description) {
      alert('Title and Description required');
      return;
    }

    for (let i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 10000000) {
        alert("Each File should be less than 10 MB of size.");
        return;
      }
    }
    let data = new FormData();
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let fileItem = this.uploader.queue[j]._file;
      console.log(fileItem.name);
      data.append('file_' + j, fileItem);
      data.append('photos[]', fileItem, fileItem.name);
      console.log("file item formdata:", data);
    }

    data.append('title', this.post.title);
    data.append('description', this.post.description);
      debugger;
    this.uploadPostService.uploadPost(data).subscribe(
      res => {
        console.log('res of add post is', res);
      },
      error => {
        //console.log("error",error); 
        //this.successMessage = error;
        console.log('err of add post is', error);
      }
    );;
    this.uploader.clearQueue();
  }

}
