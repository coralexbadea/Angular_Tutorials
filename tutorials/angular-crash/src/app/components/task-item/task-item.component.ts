import { Component, OnInit, Input,Output} from '@angular/core';
import {Task} from "../../models/Task";
import {faTimes} from "@fortawesome/free-solid-svg-icons"
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task 
  @Output() onDeleteTask:EventEmitter<Task> = new EventEmitter()
  @Output() onToogleTask:EventEmitter<Task> = new EventEmitter()
  faTimes = faTimes
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(task:Task){
    this.onDeleteTask.emit(task)

  }

  onToggle(task:Task){
    this.task.reminder = !this.task.reminder 
    this.onToogleTask.emit(task)
  }

}
