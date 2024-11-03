import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/services/backend/backend.service';
import { Tasks } from '../shared/models/tasks.class';
import { NgFor, NgIf, NgStyle } from '@angular/common';



@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [NgFor],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {

  todoCount: number = 0;
  doneCount: number = 0;
  inProgressCount: number = 0;
  awaitingFeedbackCount: number = 0;
  urgentCount: number = 0;
  tasksCount: number = 0;


  oldestUrgentDueDate: string | null = null;


  constructor(public api: BackendService) { }

  ngOnInit(): void {
    this.api.getAllTasks().subscribe({
      next: (tasks) => {
        this.updateTaskCounts(tasks); // Gesamtanzahl und Status zählen
        // this.updateDueDateCounts(tasks); // Fälligkeitsdaten prüfen
        this.findOldestUrgentDueDate(tasks);
      },
      error: (error) => console.error('Fehler beim Abrufen der Aufgaben:', error)
    });
  }


  updateTaskCounts(tasks: Tasks[]): void {
    this.todoCount = this.api.getTasksByStatus('todo').length;
    this.doneCount = this.api.getTasksByStatus('done').length;
    this.inProgressCount = this.api.getTasksByStatus('inProgress').length;
    this.awaitingFeedbackCount = this.api.getTasksByStatus('awaitingFeedback').length;
    this.urgentCount = this.api.getTasksByPriority('Urgent').length;
    this.tasksCount = tasks.length;

    // console.log('Todo:', this.todoCount);
    // console.log('Done:', this.doneCount);
    // console.log('In Progress:', this.inProgressCount);
    // console.log('Awaiting Feedback:', this.awaitingFeedbackCount);
    // console.log('Urgent:', this.urgentCount);
    // console.log('Total Tasks:', this.tasksCount);
  }

  // updateDueDateCounts(tasks: Tasks[]): void {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0); // Uhrzeit auf Mitternacht setzen, um nur das Datum zu vergleichen

  //   this.dueTodayCount = tasks.filter(task => {
  //     const dueDate = new Date(task.due_date);
  //     return dueDate.getTime() === today.getTime();
  //   }).length;

  //   this.overdueCount = tasks.filter(task => {
  //     const dueDate = new Date(task.due_date);
  //     return dueDate.getTime() < today.getTime();
  //   }).length;

  //   this.upcomingCount = tasks.filter(task => {
  //     const dueDate = new Date(task.due_date);
  //     return dueDate.getTime() > today.getTime();
  //   }).length;
  // }

  findOldestUrgentDueDate(tasks: Tasks[]): void {
    const urgentTasks = tasks
      .filter(task => task.priority === 'Urgent' && task.due_date) // Nur `urgent`-Tasks mit `due_date`
      .map(task => new Date(task.due_date)); // Datum extrahieren und in Date-Objekte umwandeln

    if (urgentTasks.length > 0) {
      // Das früheste Datum finden
      const oldestDate = new Date(Math.min(...urgentTasks.map(date => date.getTime())));
      this.oldestUrgentDueDate = oldestDate.toLocaleDateString('de-DE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }); // Datum in deutschem Format anzeigen
      // console.log(this.oldestUrgentDueDate);

    } else {
      this.oldestUrgentDueDate = 'Kein Fälligkeitsdatum vorhanden';
      // console.log(this.oldestUrgentDueDate);

    }
  }

}
