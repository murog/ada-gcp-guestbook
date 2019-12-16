import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';



@Injectable()
export class MessageService {

    baseUrl: string;
    constructor(private http: HttpClient) {
        if (environment.production){
            this.baseUrl= environment.baseURL;
        } else {
            this.baseUrl= environment.baseURL;
        }
     }

    
    
    

    getStickers() {
        return this.http.get(this.baseUrl + "/stickers");
    }

    getMessages() {
        return this.http.get(this.baseUrl + "/messages");
    }

    postMessage(message: Object){
            const body = JSON.stringify(message);
            // const body = message;
            const headers = new HttpHeaders().set('Content-Type', 'application/json');
            return this.http.post<Object>(this.baseUrl + "/messages", body, { headers: headers });
    }
        
}

