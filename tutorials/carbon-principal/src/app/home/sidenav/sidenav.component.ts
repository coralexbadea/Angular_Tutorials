import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ITEMS } from '../data/sidenav-data'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SidenavComponent implements OnInit {
  @Input() hidden:boolean = true;
  @Input() expanded: boolean = false;
  public items :any;

  constructor() { }

  ngOnInit(): void {
    this.items = ITEMS;
  }

}
