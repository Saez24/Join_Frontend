import { Component } from '@angular/core';
import { BackendService } from '../shared/services/backend/backend.service';
import { Tasks } from '../shared/models/tasks.class';
import { NgFor, NgIf, NgStyle } from '@angular/common';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NgFor, NgStyle, NgIf],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss',
    './board.component_mobile.scss'
  ]
})
export class BoardComponent {

  data = [];
  noData: any;
  tasks: Tasks[] = [];
  newTask: Tasks = {
    title: '',
    description: '',
    priority: '',
    status: '',
    category: '',
    assigned_to: '',
    subtasks: [],
    due_date: '',
  };

  buttonImages: Record<string, string> = {
    Urgent: 'img/icons/prio_alta.png',
    Medium: 'img/icons/prio_media.png',
    Low: 'img/icons/prio_baja.png'
  };


  prioImages = {
    'edit-urgent': 'img/icons/prio_alta.png',
    'edit-medium': 'img/icons/prio_media.png',
    'edit-low': 'img/icons/prio_baja.png'
  };

  buttonColors = {
    urgent: { background: '#FF3D00', color: '#FFFFFF' },
    medium: { background: '#FFA800', color: '#FFFFFF' },
    low: { background: '#7AE229', color: '#FFFFFF' }
  };

  categoryColors: { [key: string]: { background: string; color: string } } = {
    Finance: { background: '#FF7A00', color: '#FFFFFF' },
    IT: { background: '#FF5EB3', color: '#FFFFFF' },
    Sales: { background: '#6E52FF', color: '#FFFFFF' },
    HR: { background: '#9327FF', color: '#FFFFFF' },
    Marketing: { background: '#00BEE8', color: '#FFFFFF' },
    Operations: { background: '#1FD7C1', color: '#FFFFFF' },
    Product: { background: '#FF745E', color: '#FFFFFF' }
  };


  constructor(public api: BackendService) { }

  ngOnInit(): void {
    this.loadTasks(); // Lade die Aufgaben beim Initialisieren
  }

  loadTasks(): void {
    this.api.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks; // Speichere die Aufgaben in der Komponente
        console.log('Aufgaben geladen:', this.tasks); // Protokolliere die geladenen Aufgaben
      },
      error: (error) => {
        console.error('Fehler beim Laden der Aufgaben:', error);
      }
    });
  }

  startDragging(taskId: string) {
    console.log('Start dragging task:', taskId);
    // Logic to handle drag
  }

  showPopup(taskId: string) {
    console.log('Show popup for task:', taskId);
    // Show task details popup
  }

  moveTaskUp(task: Tasks) {
    console.log('Move task up:', task);
    // Logic to move task up
  }

  moveTaskDown(task: Tasks) {
    console.log('Move task down:', task);
    // Logic to move task down
  }

  getPriorityImage(priority: string): string {
    // Falls die Priorität im buttonImages-Objekt vorhanden ist, gib das Bild zurück, sonst ein Standardbild
    return this.buttonImages[priority];
  }


  getStatusTitle(status: string): string {
    switch (status) {
      case 'todo': return 'To Do';
      case 'inprogress': return 'In Progress';
      case 'awaitfeedback': return 'Await Feedback';
      case 'done': return 'Done';
      default: return 'Unknown';
    }
  }

  getCategoryColor(category: string): { background: string; color: string } {
    // console.log('Überprüfe Kategorie:', category); // Überprüfung des übergebenen Wertes
    const color = this.categoryColors[category];

    if (color) {
      // console.log('Farbe gefunden für Kategorie:', category, color);
      return color; // Rückgabe der gefundenen Farbe
    } else {
      // console.log('Kategorie nicht gefunden, Standardfarbe verwendet.');
      return { background: '#CCCCCC', color: '#000000' }; // Standardfarbe
    }
  }



  // getAllTasksStatus() {
  //   this.api.getAll('taskstatus').subscribe({
  //     next: (results: any) => {  // Der Typ `any` erlaubt dir die JSON-Daten direkt zu verarbeiten
  //       this.data = results.results;  // Ergebnisse zuweisen, falls `results` ein JSON-Objekt ist
  //       console.log("Status:", results);  // Direktes JSON-Objekt im Konsolen-Log
  //     },
  //     error: (error) => {
  //       console.error('Fehler beim Abrufen der Daten:', error);
  //       this.noData = true;
  //     }
  //   });
  // }

  // getAllTasksCategories() {
  //   this.api.getAll('categories').subscribe({
  //     next: (results: any) => {  // Der Typ `any` erlaubt dir die JSON-Daten direkt zu verarbeiten
  //       this.data = results.results;  // Ergebnisse zuweisen, falls `results` ein JSON-Objekt ist
  //       console.log("Category:", results);  // Direktes JSON-Objekt im Konsolen-Log
  //     },
  //     error: (error) => {
  //       console.error('Fehler beim Abrufen der Daten:', error);
  //       this.noData = true;
  //     }
  //   });
  // }

  // getAllTasksPriorities() {
  //   this.api.getAll('priority').subscribe({
  //     next: (results: any) => {  // Der Typ `any` erlaubt dir die JSON-Daten direkt zu verarbeiten
  //       this.data = results.results;  // Ergebnisse zuweisen, falls `results` ein JSON-Objekt ist
  //       console.log("Priority:", results);  // Direktes JSON-Objekt im Konsolen-Log
  //     },
  //     error: (error) => {
  //       console.error('Fehler beim Abrufen der Daten:', error);
  //       this.noData = true;
  //     }
  //   });
  // }


}
