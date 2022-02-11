import { Component, EventEmitter, HostBinding, Output, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
	title : string = "Menu"
	hamburgerActive : boolean = false;
	@Output() toggledHamburger : EventEmitter<boolean> = new EventEmitter()
	// adds padding to the top of the document, so the content is below the header
	@HostBinding('class.bx--header') headerClass = true;


	changeTitle(title :string){
		this.title = title
	}

	toggleHamburger(){
		this.hamburgerActive = !this.hamburgerActive;
		this.toggledHamburger.emit(this.hamburgerActive)
	}
}
