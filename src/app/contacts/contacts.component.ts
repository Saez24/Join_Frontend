import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/services/backend/backend.service';
import { Contacts } from '../shared/models/contacts.class';
import { NgFor, NgStyle } from '@angular/common';


@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [NgFor, NgStyle],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  users: Contacts[] = [];


  constructor(private api: BackendService) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this.api.getAll('names').subscribe({
      next: (results: any) => {
        this.users = results;  // Versuche mögliche Pfade
        console.log(this.users);  // Teste, ob die Zuweisung nun funktioniert
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    });
  }

  getInitials(name: string): string {
    if (!name) return '';
    let initials = name.split(' ').map(part => part.charAt(0)).join('');
    return initials.toUpperCase();
  }

}

