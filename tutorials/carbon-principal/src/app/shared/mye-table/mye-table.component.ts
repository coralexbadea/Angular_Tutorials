import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { PaginationTranslations, TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';
import { MyeTablePagination } from './mye-table-pagination.model';
import { MyeTableEmptyState } from './mye-table-empty-state';
import { TableColumnConfig } from './mye-table-config.model';
import { Subscription } from 'rxjs';
import { ToolbarActionTexts } from './mye-table.class';

/**
 * myEnovation Table Component
 *
 * Contains:
 * - TableToolbar
 *  Enable with: toolbar = true;
 *  Set loading state: isLoading = true;
 *  - Search-field
 *     Enable with: searchable = true;
 *     Add placeholder: searchPlaceholder = '';
 *     Set search param: querySearchParam = 's'; This parameter will be used in the query in `onFiltersChanged`.
 *     Set search value: searchValue = '';
 *     `onFiltersChanged` is called when a search value is entered, or search is cleared: query = { searchTerm: '1234'}
 *  - Customizable template
 *    Add your own toolbar-items, by defining a template within the <mye-table></mye-table> tags with a 'headerActions' attribute.
 *    Example: <div headerActions style="display:inherit;></div>
 * - Table
 *    Set table data: tableData = []; // this can be an array of any object
 *    Striped styled rows: striped = true;
 *    Sticky header: stickyHeader = true;
 *    Define columns with tableColumnsConfigData, per column:
 *      columnId > the member of a tableData row-object. (use '*' to provide the whole object, or use 'field.subField' to get nested objects)
 *      headerTitle > the translated text to show in the header.
 *      dataFormatter > define a custom data formatter. E.g. to format dates or times
 *      template > define a custom template. E.g. to show edit- / delete buttons, see Column templates below.
 *      sortable > column is sortable
 *      sorted > column is sorted
 *      ascending > column is sorted ascending, false for descending
*     `onFiltersChanged` is called when column sorting is changed: query = {sort: 'name,asc'}
 *    Show selection icon at the end of a row: showSelectionIcon = true;
 *    Enable sorting: sortable = true;
 *    Make columns resizable: columnsResizable = true;
 *    Column templates: Define a template to implement per-row custom buttons. The variables `data` and `rowIndex` can be used to retrieve the column-data and row-index.
 * - Empty state
 *    Whenever the tableData is undefined or empty, an empty state will be shown.
 *    The empty state title, body and action translations can be provided with input: `emptyStateTranslation`. (MyeTableEmptyState)
 *    If an action text is provided, the action button will be available and emit the `onEmptyStateAction` when pressed.
 * - Pagination
 *    State held in pagination object: `pagination` = { pageLength: 10, currentPage: 1, totalDataLength: 0 };
 *    Set page size options: `itemsPerPageOptions = [10,20,50,100]`;
 *    The `pageChange` event is triggered when a page is selected, or the itemsPerPage number changed.
 */
@Component({
  selector: 'mye-table',
  templateUrl: './mye-table.component.html',
  styleUrls: ['./mye-table.component.scss']
})
export class MyeTableComponent implements AfterViewInit, OnInit, OnChanges, OnDestroy {

  elementId = 'mye-table';
  isAscSort: boolean = true;
  searchQuery: {[param: string]: string};
  sortedColumnId: string;
  tableModel: TableModel = new TableModel();
  displayedPageItems: any[] = [];
  private subscriptions: Subscription[] = [];

  @ViewChild('customTableItemTemplate', {static: true}) customTableItemTemplate: TemplateRef<any>;

  @Input() tableColumnsConfigData: TableColumnConfig[];
  @Input() expandedDataConfig?: string[];
  @Input() expandedTemplate?: TemplateRef<any>;
  @Input() tableData: Array<any>;
  @Input() pagination: MyeTablePagination;
  @Input() paginationTranslation: PaginationTranslations;
  @Input() itemsPerPageOptions: Array<number>;
  @Input() toolbar: boolean = false;
  @Input() useClientSidePagination: boolean;

  @Input() searchable: boolean = false;
  @Input() searchPlaceholder: string = '';
  @Input() searchValue: string = '';
  @Input() querySearchParam: string;

  @Input() columnsResizable: boolean = false;
  @Input() sortable: boolean = false;
  @Input() striped: boolean = false;
  @Input() stickyHeader: boolean = false;
  @Input() showSelectionIcon: boolean = true;
  @Input() isLoading: boolean;
  @Input() emptyStateTranslation: MyeTableEmptyState;
  @Input() showSelectionColumn: boolean = false;

  @Input() toolbarActionTexts: ToolbarActionTexts = new ToolbarActionTexts();
  @Input() hideEmptyStateTopbar: boolean;

  @Output() rowSelected: EventEmitter<number> = new EventEmitter();
  @Output() itemSelected: EventEmitter<any> = new EventEmitter();
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  @Output() onFiltersChanged: EventEmitter<any> = new EventEmitter();
  @Output() onEmptyStateAction: EventEmitter<any> = new EventEmitter();
  @Output() onPageItemsListChanged: EventEmitter<any> = new EventEmitter();
  @Output() onRowsSelectionChanged: EventEmitter<any> = new EventEmitter();

  constructor(private _elementRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tableData) {
      const itemListDisplayed = this.displayedPageItems.length > 0;
      this.generateTableContent();
      if (!itemListDisplayed && this.displayedPageItems.length) {
        this.onPageItemsListChanged.emit(this.displayedPageItems);
      }
    }
    if (changes.tableColumnsConfigData) {
      this.generateTableHeader();
    }
    if (changes.pagination) {
      this.generateTableContent();
    }
  }

  ngAfterViewInit() {
    const id = this._elementRef.nativeElement.id;
    this.elementId = id? id : this.elementId;

    this.generateTableHeader();
    this.generateTableContent();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.tableModel.rowsSelectedChange.subscribe(() => {
        const selectionRows = this.tableModel.rowsSelected;

        const selectedItems = this.displayedPageItems.filter((item, index) => selectionRows[index])
        if (selectedItems) {
          this.onRowsSelectionChanged.emit(selectedItems);
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => {
      item.unsubscribe();
    });
  }

  generateTableContent() {
    if (!this.tableData || !this.tableData.length) {
      this.tableModel.data = [];
      this.displayedPageItems = [];
      return;
    }
    this.displayedPageItems = this.getTableData();
    this.tableModel.data = this.displayedPageItems.map((tableDataItem, index) => this.generateTableRow(tableDataItem, index));
  }

  getTableData() {
    let tableData = [... this.tableData];
    if (this.useClientSidePagination && this.pagination) {
      const { currentPage, pageLength } = this.pagination;
      const endIndex = currentPage * pageLength;
      const startIndex = endIndex - pageLength;

      if (this.sortedColumnId) {
        tableData = this.sortTableData(tableData);
      }
      tableData = tableData.slice(startIndex, endIndex);
    }

    return tableData;
  }

  sortTableData(tableData) {
    return tableData.sort((a, b) => {
      if (a[this.sortedColumnId] > b[this.sortedColumnId]) {
        return this.isAscSort ? 1 : -1
      } else {
        return this.isAscSort ? -1 : 1
      }
    })
  }

  generateTableHeader() {
    this.tableModel.header = [];
    this.tableColumnsConfigData.forEach((columnConfig: TableColumnConfig) => {
      let config = {};
      if (columnConfig.headerText) {
        config = {data: columnConfig.headerText};
      }

      if (typeof columnConfig.sortable !== 'undefined') {
        config['sortable'] = columnConfig.sortable;
      }

      if (typeof columnConfig.sorted) {
        config['sorted'] = columnConfig.sorted;
        config['ascending'] = columnConfig.ascending;
      }

      this.tableModel.header.push(
        new TableHeaderItem(config)
      );
    });
    if (this.showSelectionIcon) {
      this.tableModel.header.push(
        new TableHeaderItem({sortable: false})
      );
    }
  }

  generateTableRow(tableData: any, rowIndex: number): Array<TableItem> {
    const tableRow: Array<TableItem> = [];
    this.tableColumnsConfigData.forEach((columnConfig: TableColumnConfig) => {
      let config = {rowIndex};
      if (columnConfig.columnId) {
        config['data'] = this.parseColumnValue(columnConfig, tableData);
      }
      if (columnConfig.template) {
        config['template'] = columnConfig.template;
      }

      if (this.expandedDataConfig) {
        config['expandedData'] = this.generateExpandedData(tableData);
      }

      if (this.expandedTemplate) {
        config['expandedTemplate'] = this.expandedTemplate;
      }

      if (columnConfig.title) {
        config['title'] = columnConfig.title;
      }
      
      tableRow.push(new TableItem(config));
    });

    if (this.showSelectionIcon) {
      tableRow.push(new TableItem({template: this.customTableItemTemplate, data: rowIndex}));
    }
    return tableRow;
  }

  generateExpandedData(tableData) {
    if (!this.expandedDataConfig || !this.expandedDataConfig.length) {
      return {};
    }
    let expandedData = {};

    this.expandedDataConfig.forEach((expandedDataItem: string) => {
      if (tableData) {
        expandedData[expandedDataItem] = this.parseColumnValue(<TableColumnConfig>{columnId: expandedDataItem}, tableData);
      }
    });

    return expandedData;
  }

  private parseColumnValue(columnConfig: TableColumnConfig, tableData): any {
    let value;
    if (columnConfig.columnId === '*') {
      value = tableData;
    } else {
      const dataPath = columnConfig.columnId.split('.');
      value = tableData;
      // Walk through nested objects
      while (dataPath.length > 0 && !!value) {
        value = value[dataPath[0]];
        dataPath.shift();
      }
    }
    if (typeof columnConfig.dataFormatter === 'function') {
      value = columnConfig.dataFormatter(value);
    }
    return value;
  }

  search(searchTerm?: string) {
    const genericSearchParam = this.querySearchParam || 'searchTerm';
    // reset current page
    this.pagination.currentPage = 1;

    if (searchTerm) {
      const param = genericSearchParam;
      this.searchQuery = {[param]: searchTerm};
    } else {
      this.searchQuery = {};
    }
    this.onFiltersChanged.emit(this.getQuery());
  }

  getQuery() {
    // page-index used by apis is starting at 0
    let query = {
      ...this.searchQuery,
      page: this.pagination.currentPage - 1,
      size: this.pagination.pageLength
    };

    if (this.sortedColumnId) {
      const direction = this.isAscSort ? 'asc' : 'desc';
      query['sort'] = `${this.sortedColumnId},${direction}`;
    }

    return query;
  }

  sort(index: number, sortAscending?: boolean) {
    let sorted: boolean = true;

    if (typeof sortAscending !== 'undefined') {
      this.isAscSort = sortAscending;
    } else if (this.tableModel.header[index].sorted) {
      if (!this.isAscSort) {
        sorted = false;
      }
      this.isAscSort = !this.isAscSort;
    }

    this.sortedColumnId = sorted ? this.tableColumnsConfigData[index].columnId : null;
    this.generateTableHeader();
    this.tableModel.header[index].sorted = sorted;
    this.tableModel.header[index].ascending = this.isAscSort;

    this.onFiltersChanged.emit(this.getQuery());
    if (this.useClientSidePagination) {
      this.generateTableContent();
      this.onPageItemsListChanged.emit(this.displayedPageItems);
    }
  }

  selectRow(index: number) {
    const selectedItem = this.displayedPageItems[index];
    /**
     * rowSelected can be used when we only need to know index of the selected row
     * itemSelected can be used when we what to know the selected item's data
     */
    this.rowSelected.emit(index);
    this.itemSelected.emit(selectedItem);
  }

  selectPage(pageNumber: number) {
    if (this.useClientSidePagination) {
      this.pagination.currentPage = pageNumber;
      this.generateTableContent();
      this.onPageItemsListChanged.emit(this.displayedPageItems);
    }
    this.pageChanged.emit(pageNumber - 1);
  }

  emptyStateAction() {
    this.onEmptyStateAction.emit();
  }

}
