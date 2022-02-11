import { Component, OnInit, Output} from '@angular/core';
import { Task } from 'src/app/models/Task';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask:EventEmitter<Task> = new EventEmitter();
  text: string;
  day: string;
  reminder: boolean;

  showAddTask:boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) { 
    this.subscription = this.uiService.getSubjectToggleAddTask().subscribe((variable)=>{
      this.showAddTask = variable;
    })
  }

  ngOnInit(): void {

  }

  onSubmit(){
    if(!this.text){
      alert("Please insert task!")
      return 
    }
    const newTask:Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask)

    this.text = ""
    this.day = ""
    this.reminder = false
  }

}
