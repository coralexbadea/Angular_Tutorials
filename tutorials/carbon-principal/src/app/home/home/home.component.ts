import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public expandedSidenav: boolean = false;
	constructor(){}
	ngOnInit(): void {

	}

	toggleSidenav($event: boolean){
		this.expandedSidenav=$event;
	}

}
