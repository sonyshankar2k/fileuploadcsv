import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileToUpload } from '../interfaces/file-to-upload';

const API_URL = "http://localhost:5000/api/FileUpload/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  public uploadFile(theFile: FileToUpload) : Observable<any> {
    return this.http.post<FileToUpload>(
               API_URL, theFile, httpOptions);
  }  
}