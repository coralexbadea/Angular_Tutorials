import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Mailbox } from '../models/mailbox';
import { MyeTablePagination, TableColumnConfig } from '../../shared/mye-table';
import * as fromMailboxState from '../state/mailbox.selector'

const columns = ['clientNumber', 'displayName', 'emailAddress', 'users'];
const itemsPerPageOptions = [10, 15, 20];

@Component({
  selector: 'app-another-table',
  templateUrl: './another-table.component.html',
  styleUrls: ['./another-table.component.scss']
})
export class AnotherTableComponent implements OnInit {
  public pagination = { currentPage: 1, pageLength: itemsPerPageOptions[0], totalDataLength: itemsPerPageOptions[0] } as MyeTablePagination;
  public showSelectionColumn : boolean = false;
  public striped : boolean = false;
  public translations : any;
  public mailboxes : Mailbox[] = [];
  public columnData : TableColumnConfig[];
  public columns = columns;
  public itemsPerPageOptions = itemsPerPageOptions;
  constructor(private store:Store<any>) { }

  ngOnInit(): void {
    this.store.select(fromMailboxState.getMailboxes).subscribe(
      mailboxes => { this.mailboxes = mailboxes
        console.log(this.mailboxes)
      })
    var columnDisplayNames = ["ZorgMail clientnumber","Display name","Email address","Users"];
    this.columnData = columns.map((column,index) => {
      return { columnId: column, headerText: columnDisplayNames[index]} as TableColumnConfig;
    });
    
    this.translations = { 
      ITEMS_PER_PAGE: "Mailboxes per page: "
    }
  }
  
  
}
