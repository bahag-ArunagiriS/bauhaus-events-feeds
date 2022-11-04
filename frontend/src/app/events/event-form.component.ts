import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from '../models/event';
import { NgForm } from '@angular/forms';
import { EventsService } from './events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;

  constructor(private eventService: EventsService, private router: Router) {}

  ngOnInit(): void {
    // add validation using forms - FormGroup
    this.eventForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9 ]*$'),
      ]),
      description: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
    });
  }
  // add function
  add(): void {
    const form = this.eventForm.value;
    const event = new Event(form.title, '', form.description, form.location, 0);
    this.eventService.addEvent(event).subscribe((data) => console.log(data));
    this.eventForm.reset();
    this.router.navigate(['']);
  }

  //fetch title
  get title() {
    return this.eventForm.get('title')!;
  }

  //fetch description
  get description() {
    return this.eventForm.get('description')!;
  }

  //fetch location
  get location() {
    return this.eventForm.get('location')!;
  }
}
