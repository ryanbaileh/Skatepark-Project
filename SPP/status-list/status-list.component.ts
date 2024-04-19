import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter, Observable, Observer, ReplaySubject } from 'rxjs';
import { fadeInRightAnimation } from 'src/@shell/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@shell/animations/fade-in-up.animation';
import { ListColumn } from 'src/@shell/shared/list/list-column.model';
import { LuStatus, StatusService } from 'src/services';
import { SharedService } from 'src/services/shared.service';
import { StatusEditComponent } from '../status-edit/status-edit.component';


@Component({
  selector: 'spp-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class StatusListComponent implements OnInit, AfterViewInit, OnDestroy {

  subject$: ReplaySubject<LuStatus[]> = new ReplaySubject<LuStatus[]>(1);
  data$: Observable<LuStatus[]> = this.subject$.asObservable();
  skateparks: LuStatus[];

  @Input()
  columns: ListColumn[] = [
    
    { name: ' Status Name', property: 'statusName', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true, isModelProperty: false }
  ] as ListColumn[];
  pageSize = 50;
  dataSource: MatTableDataSource<LuStatus> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private statusService: StatusService,
    private sharedService: SharedService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }


  ngOnInit() {

    this.loadData();
    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter(data => !!data)
    ).subscribe(
        resp => {
          this.skateparks = resp;
          this.dataSource.data = resp;
      }
    );
  }

  private loadData() {
    this.statusService.apiStatusGet().subscribe(
      {
        next: (resp?: LuStatus[]) => this.subject$.next(resp),
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }




  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }
  buttonAction(){

  }

  isAddOpen: boolean=false;
  createItem() {

    if (this.isAddOpen) return;

    this.isAddOpen=true;

    this.dialog.open(StatusEditComponent, {
      data: -1
    }).afterClosed().subscribe((spotStatus: LuStatus) => {
      /**
       * Item is the updated if the user pressed Save - otherwise it's null
       */

      this.isAddOpen=false;
      if (spotStatus) {
        this.loadData();
      }
    });
  }

  isEditOpen: boolean= false;
  updateItem(status: LuStatus) {

    if (this.isEditOpen) return;

    this.isEditOpen=true;
    
    this.dialog.open(StatusEditComponent, {
      data: status.statusID
    }).afterClosed().subscribe((spotStatus: LuStatus) => {
      /**
       * item is the updated,if the user pressed Save - otherwise it's null
       */
      this.isEditOpen=false;
      if (spotStatus) {
        this.loadData();
      }
    });
  }

  deleteItem(status: LuStatus) {
    this.statusService.apiStatusStatusIdDelete(status.statusID,).subscribe(
      {
        next: (resp?: any)=>  this.loadData(),
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
     });
  }




  ngOnDestroy() {
  }
}
