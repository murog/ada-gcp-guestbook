import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MessageFormService {
    constructor(private http: HttpClient) { }

    baseUrl = 'http://localhost:8000';

    getStickers() {
        return this.http.get<ArrayLike<string>>(this.baseUrl + "/stickers");
    }

    getMessages() {
        return this.http.get<ArrayLike<string>>(this.baseUrl + "/messages");
    }

    postMessage(message: Object){
            const body = message;
            const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.post<Object>(this.baseUrl + "/messages", body, { headers: headers });
    }
        
}

