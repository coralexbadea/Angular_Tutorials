import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Mailbox } from '../models/mailbox';
import { GetMailboxes } from '../state/mailbox.actions';
import * as fromMailboxState from '../state/mailbox.selector'
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumnConfig } from 'src/app/shared/mye-table/mye-table-config.model';
import { MyeTablePagination } from 'src/app/shared/mye-table/mye-table-pagination.model';
const columns = ['clientNumber', 'displayName', 'emailAddress', 'users'];
const itemsPerPageOptions = [10, 15, 20];

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocsComponent implements OnInit {
  
  //public model = new TableModel();
  //public paginationModel = new PaginationModel();

  public pagination = { currentPage: 1, pageLength: itemsPerPageOptions[0], totalDataLength: itemsPerPageOptions[0] } as MyeTablePagination;
  public showSelectionColumn : boolean = false;
  public striped : boolean = false;
  public translations : any;
  public mailboxes : Mailbox[] = [];
  public columnData : TableColumnConfig[];
  public itemsPerPageOptions = itemsPerPageOptions;
  constructor(
              private store: Store<any>,
              private router: Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.store.dispatch(new GetMailboxes())
    this.store.select(fromMailboxState.getMailboxes).subscribe(
      mailboxes => { this.mailboxes = mailboxes
        console.log(this.mailboxes)
        //TODO unsubscribe; migrate state in this module
        // this.model.data = mailboxes
        // .map(mailbox => {
        //   return Object.keys(mailbox)
        //     .map((key,index)=>{
        //       return new TableItem({data:mailbox[key],expandedData: "No template"})
        //     })       
        // })
      }
    )

    // this.model.header = [
    //   new TableHeaderItem({data: "ZorgMail clientnumber"}), 
    //   new TableHeaderItem({data: "Display name"}),  
    //   new TableHeaderItem({data: "Email address"}),
    //   new TableHeaderItem({data: "Users"})
    // ]
    
    
    var columnDisplayNames = ["ZorgMail clientnumber","Display name","Email address","Users"];
    this.columnData = columns.map((column,index) => {
      return { columnId: column, headerText: columnDisplayNames[index], expandedData:"No Template"} as TableColumnConfig;
    });


    this.translations = { 
      ITEMS_PER_PAGE: "Mailboxes per page: "
    }
  }

  public selectPage(obj:any){
    console.log(obj)
  }

  navigateToMailbox(obj:any){
    console.log('here2')
    console.log(this.mailboxes)
  }

  loadUsers(mailboxes:any){
    this.mailboxes = mailboxes
    console.log('here3')
    console.log(this.mailboxes)
  }
  tryAgain(){
    console.log('here4')
    console.log(this.mailboxes)
  }
  onFiltersChanged(obj:any){
    console.log('here5')
    console.log(this.mailboxes)
  }

  navigateTo(path:String){
    this.router.navigate([path], {relativeTo: this.route})
  }



}
