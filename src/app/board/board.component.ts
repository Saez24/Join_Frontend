import { Component } from '@angular/core';
import { BackendService } from '../shared/services/backend/backend.service';
import { Tasks } from '../shared/models/tasks.class';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NgFor],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss',
    './board.component_mobile.scss'
  ]
})
export class BoardComponent {

  data = [];
  noData: any;
  results = [];
  tasks: Tasks[] = [];
  newTask: Tasks = {
    title: '',
    description: '',
    priority: '',
    status: '',
    category: '',
    assigned_to: '',
    subtasks: [],
    due_date: ''
  };


  constructor(private api: BackendService) { }

  ngOnInit(): void {
    this.getAllTasks();
    this.getAllTasksStatus();
    this.getAllTasksCategories();
    this.getAllTasksPriorities()
  }

  getAllTasks() {
    this.api.getAll('tasks').subscribe({
      next: (results: any) => {  // Der Typ `any` erlaubt dir die JSON-Daten direkt zu verarbeiten
        this.data = results.results;  // Ergebnisse zuweisen, falls `results` ein JSON-Objekt ist
        console.log("Tasks:", results);  // Direktes JSON-Objekt im Konsolen-Log
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Daten:', error);
        this.noData = true;
      }
    });
  }

  getAllTasksStatus() {
    this.api.getAll('taskstatus').subscribe({
      next: (results: any) => {  // Der Typ `any` erlaubt dir die JSON-Daten direkt zu verarbeiten
        this.data = results.results;  // Ergebnisse zuweisen, falls `results` ein JSON-Objekt ist
        console.log("Status:", results);  // Direktes JSON-Objekt im Konsolen-Log
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Daten:', error);
        this.noData = true;
      }
    });
  }

  getAllTasksCategories() {
    this.api.getAll('categories').subscribe({
      next: (results: any) => {  // Der Typ `any` erlaubt dir die JSON-Daten direkt zu verarbeiten
        this.data = results.results;  // Ergebnisse zuweisen, falls `results` ein JSON-Objekt ist
        console.log("Category:", results);  // Direktes JSON-Objekt im Konsolen-Log
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Daten:', error);
        this.noData = true;
      }
    });
  }

  getAllTasksPriorities() {
    this.api.getAll('priority').subscribe({
      next: (results: any) => {  // Der Typ `any` erlaubt dir die JSON-Daten direkt zu verarbeiten
        this.data = results.results;  // Ergebnisse zuweisen, falls `results` ein JSON-Objekt ist
        console.log("Priority:", results);  // Direktes JSON-Objekt im Konsolen-Log
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Daten:', error);
        this.noData = true;
      }
    });
  }
}
