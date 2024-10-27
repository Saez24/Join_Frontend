import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/services/backend/backend.service';
import { Contacts } from '../shared/models/contacts.class';
import { NgFor, NgIf, NgStyle } from '@angular/common';


@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [NgFor, NgStyle, NgIf],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss',
    '../shared/animations/animations.scss'
  ]
})
export class ContactsComponent implements OnInit {

  isOverlayVisible = false;
  users: Contacts[] = [];


  constructor(private api: BackendService) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this.api.getAll('names').subscribe({
      next: (results: any) => {
        this.users = results.map((data: any) => new Contacts(data));
        console.log(this.users);
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

  slideInFromRight() {
    const contactCont = document.getElementById('contact-cont');
    contactCont?.classList.add('slide-in-from-right');

    setTimeout(() => {
      this.isOverlayVisible = true;
      contactCont?.classList.remove('slide-in-from-right');
    }, 300); // Timeout muss die gleiche Dauer wie die CSS-Animation haben
  }

  slideOutToRight() {
    const contactCont = document.getElementById('contact-cont');
    contactCont?.classList.add('slide-out-to-right');

    setTimeout(() => {
      this.isOverlayVisible = false;
      contactCont?.classList.remove('slide-out-to-right');
    }, 300); // Timeout muss die gleiche Dauer wie die CSS-Animation haben
  }

  closeOverlayWhenGreyAreaWasClicked(event: Event) {
    if (event.target === document.getElementById('contact-overlay')) {
      this.slideOutToRight();
    }
  }

  createContact() {
    // Logik zum Erstellen eines Kontakts
  }

}

