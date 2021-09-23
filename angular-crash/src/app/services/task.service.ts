import { Injectable } from '@angular/core';
import {Task} from '../models/Task'
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from "@angular/common/http"

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiURL = "http://localhost:5000/tasks" 
 

  constructor(private http:HttpClient) {
    
   }

  getTasks(): Observable<Task[]>{
    return (this.http.get<Task[]>(this.apiURL));
  }


  deleteTask(task:Task): Observable<Task>{
    return this.http.delete<Task>(`${this.apiURL}/${task.id}`)
  }

  toggleTask(task:Task): Observable<Task>{
    const url = `${this.apiURL}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task:Task){
    return this.http.post<Task>(this.apiURL, task, httpOptions)
  }
}
