import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-added-msg',
  templateUrl: './search-added-msg.component.html',
  styleUrls: ['./search-added-msg.component.css']
})
export class SearchAddedMsgComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
main()
{
  this.router.navigate(['/Main',sessionStorage.getItem('ucode')]);

}
}
