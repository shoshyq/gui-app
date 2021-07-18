import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-title',
  templateUrl: './custom-title.component.html',
  styleUrls: ['./custom-title.component.css']
})
export class CustomTitleComponent implements OnInit {

  @Input() text?: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
