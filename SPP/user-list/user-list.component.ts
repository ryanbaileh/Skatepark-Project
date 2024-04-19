import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter, Observable, Observer, ReplaySubject } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { fadeInRightAnimation } from 'src/@shell/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@shell/animations/fade-in-up.animation';
import { ListColumn } from 'src/@shell/shared/list/list-column.model';
import { User, UserService } from 'src/services';
import { SharedService } from 'src/services/shared.service';
import { UserEditComponent } from '../user-edit/user-edit.component';


@Component({
  selector: 'spp-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {

  subject$: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);
  data$: Observable<User[]> = this.subject$.asObservable();
  users: User[];

  @Input()
  columns: ListColumn[] = [

    { name: 'User Name', property: 'userName', visible: true, isModelProperty: true },
    { name: 'Machine ID', property: 'machineID', visible: true, isModelProperty: true },
    { name: 'User Email', property: 'userEmail', visible: true, isModelProperty: true },
    { name: 'Is Admin', property: 'isAdmin', visible: true, isModelProperty: true },
    { name: 'Is Spotter', property: 'isSpotter', visible: true, isModelProperty: true },
    { name: 'Is Active', property: 'isActive', visible: true, isModelProperty: true },

    { name: 'Actions', property: 'actions', visible: true, isModelProperty: false }
  ] as ListColumn[];
  pageSize = 50;
  dataSource: MatTableDataSource<User> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
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
          this.users = resp;
          this.dataSource.data = resp;
      }
    );
  }

  private loadData() {
    this.userService.apiSkateparksUserListGet().subscribe(
      {
        next: (resp?: User[]) => this.subject$.next(resp),
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


  isEditOpen: boolean=false;
  updateItem(user: User) {

    if (this.isEditOpen) return;

    this.isEditOpen=true;

    this.dialog.open(UserEditComponent, {
      data: user.userID
    }).afterClosed().subscribe((user: User) => {
      /**
       * item is the updated,if the user pressed Save - otherwise it's null
       */
      this.isEditOpen=false;
      if (user) {
        this.loadData();
      }
        
      
    });
  }


/**
  deleteItem(user: User) {
    this.userService.apiMediaTypeMediaTypeIdDelete(mediaType.mediaTypeID,).subscribe(
      {
        next: (resp?: any)=>  this.loadData(),
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
     });
  }
  */




  ngOnDestroy() {
  }
}
