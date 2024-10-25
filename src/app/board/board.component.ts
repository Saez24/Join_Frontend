import { Component } from '@angular/core';
import { BackendService } from '../shared/services/backend/backend.service';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss',
    './board.component_mobile.scss'
  ]
})
export class BoardComponent {

  public data = [];
  public noData: any;
  public results = [];

  constructor(private api: BackendService) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this.api.getAll('tasks').subscribe({
      next: (results: any) => {  // Der Typ `any` erlaubt dir die JSON-Daten direkt zu verarbeiten
        this.data = results.results;  // Ergebnisse zuweisen, falls `results` ein JSON-Objekt ist
        console.log(results);  // Direktes JSON-Objekt im Konsolen-Log
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Daten:', error);
        this.noData = true;
      }
    });
  }
}
