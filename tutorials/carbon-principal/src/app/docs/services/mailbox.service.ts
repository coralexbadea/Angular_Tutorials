import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mailbox } from '../models/mailbox';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class MailboxService {

  private BASE_API : string = 'http://localhost:5000/mailboxes'
  constructor(private http: HttpClient) { }

  getMailboxes() {
    return this.http.get<Mailbox[]>(this.BASE_API);
  }
}
