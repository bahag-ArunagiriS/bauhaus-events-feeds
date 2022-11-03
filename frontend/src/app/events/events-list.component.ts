import { Component, OnInit } from '@angular/core';
import {Event} from '../models/event'
@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  modelEvent: Event[] =
    [
      {"title": "a mock event",
        "id": "68d8c38c-5b66-42f5-824f-753493d29b9a",
        "description": "something really cool",
        "location": "Joes pizza",
        "likes": 0
      },
      {"title": "another mock event",
        "id": "4566f755-79bf-4fed-9513-8d69422ad59f",
        "description": "something even cooler",
        "location": "Johns pizza",
        "likes": 0
      }
      ]
  constructor() { }

  ngOnInit(): void {
  }

}
