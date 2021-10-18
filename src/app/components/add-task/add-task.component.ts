import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../types';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  text!: string;
  day!: string;
  reminder: boolean = false;
  showAddTask!: boolean;
  subscription!: Subscription;

  @Output() onSubmitTask: EventEmitter<Task> = new EventEmitter();

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}
  onSubmit(): void {
    if (!this.text) {
      alert('Please add a task');
      return;
    }
    const newTask: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.onSubmitTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
