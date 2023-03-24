import { Component, OnInit } from '@angular/core';
import { FileToUpload } from '../interfaces/file-to-upload';
import { FileUploadService } from '../services/file-upload.service';

// Maximum file size allowed to be uploaded = 1MB
const MAX_SIZE: number = 11048576;
// const MAX_SIZE: number = 1048576; for 1MB

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  theFile: any;
  messages: string[] = [];
  rawDataAsText: any;
  rawDataAsBase64: any;
  constructor(private uploadService: FileUploadService) { }

  ngOnInit() {
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      // Don't allow file sizes over XXMB
      if (event.target.files[0].size < MAX_SIZE) {
        // Set theFile property
        this.theFile = event.target.files[0];
      }
      else {
        // Display error message
        this.messages.push("File: " + event.target.files[0].name 
            + " is too large to upload.");
      }
    }
  }
  
  private readAndUploadFileAsBase64(theFile: any) {
    let file = new FileToUpload();
    // Set File Information
    file.fileName = theFile.name;
    file.fileSize = theFile.size;
    file.fileType = theFile.type;
    file.lastModifiedTime = theFile.lastModified;
    file.lastModifiedDate = theFile.lastModifiedDate;
    // Use FileReader() object to get file to upload
    // NOTE: FileReader only works with newer browsers
    let reader = new FileReader();
    // Setup onload event for reader
    reader.onload = () => {
      console.log(reader.result);
      file.fileAsBase64 = reader.result?.toString() ?? '';
      this.rawDataAsBase64 = file.fileAsBase64;
      console.log(this.rawDataAsBase64);
    }
    // Read the file    
    reader.readAsDataURL(theFile);
  }

  private readAndUploadFileAsText(theFile: any) {
    let file = new FileToUpload();
    // Set File Information
    file.fileName = theFile.name;
    file.fileSize = theFile.size;
    file.fileType = theFile.type;
    file.lastModifiedTime = theFile.lastModified;
    file.lastModifiedDate = theFile.lastModifiedDate;
    // Use FileReader() object to get file to upload
    // NOTE: FileReader only works with newer browsers
    let reader = new FileReader();
    // Setup onload event for reader
    reader.onload = () => {
      // console.log(reader.result);
      this.rawDataAsText = reader.result?.toString() ?? '';
    }
    // Read the file    
    reader.readAsText(theFile)
  }

  uploadFile(): void {
    this.readAndUploadFileAsBase64(this.theFile);
    this.readAndUploadFileAsText(this.theFile);
  }
}
