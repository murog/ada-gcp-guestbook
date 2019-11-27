import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const result = require('dotenv').config();
if (result.error) {
    console.log("Failed to load env variables from dotenv.")
}

@Injectable()
export class MessageService {
    constructor(private http: HttpClient) { }

    baseUrl = process.env.BASE_URL

    getStickers() {
        return this.http.get(this.baseUrl + "/stickers");
    }

    getMessages() {
        return this.http.get(this.baseUrl + "/messages");
    }

    postMessage(message: Object){
            const body = message;
            const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.post<Object>(this.baseUrl + "/messages", body, { headers: headers });
    }
        
}

