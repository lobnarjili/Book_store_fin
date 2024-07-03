import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient,
    @Inject('BaseURL') private baseUrl: string) { }
   
   // Uploads an image file to the server with the specified ID
   upload(file: File, id: number): Observable<HttpEvent<any>> {
    // Create a new FormData object to hold the file data
    const formData: FormData = new FormData();
    formData.append('file', file);  // Append the file to the FormData object

    const req = new HttpRequest('PATCH',
      `${this.baseUrl}storage/upload/${id}`,
      formData,
      {
        reportProgress: true,  // Enable progress events for the request Rapport sur upload de mon image 
        responseType: 'json',  // Expect a JSON response from the server
        withCredentials: true 
      });

    return this.http.request(req);
  }
}