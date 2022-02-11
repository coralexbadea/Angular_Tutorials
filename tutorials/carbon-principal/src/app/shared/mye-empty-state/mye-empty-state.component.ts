import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    /* tslint:disable:component-selector */
    selector: 'mye-empty-state',
    templateUrl: './mye-empty-state.component.html',
    styleUrls: ['./mye-empty-state.component.scss']
})
export class MyeEmptyStateComponent {

  @Input() title: string | undefined;
  @Input() body: string | undefined;
  @Input() action: string | undefined;
  @Input() hideTopbar: boolean | undefined;
  @Input() imageUrl?: string;
  @Input() tableMode: boolean = true;
  @Output() actionEmitted = new EventEmitter();

  constructor() {}

  emitAction(): void {
      this.actionEmitted.emit();
  }
}
