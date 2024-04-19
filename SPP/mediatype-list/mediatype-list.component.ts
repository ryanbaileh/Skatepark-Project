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
import { LuMediaType, MediaTypeService } from 'src/services';
import { SharedService } from 'src/services/shared.service';
import { MediatypeEditComponent } from '../mediatype-edit/mediatype-edit.component';

@Component({
  selector: 'spp-mediatype-list',
  templateUrl: './mediatype-list.component.html',
  styleUrls: ['./mediatype-list.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class MediatypeListComponent implements OnInit, AfterViewInit, OnDestroy {

  subject$: ReplaySubject<LuMediaType[]> = new ReplaySubject<LuMediaType[]>(1);
  data$: Observable<LuMediaType[]> = this.subject$.asObservable();
  skateparks: LuMediaType[];

  @Input()
  columns: ListColumn[] = [

    { name: 'Media Type Name', property: 'mediaTypeName', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true, isModelProperty: false }
  ] as ListColumn[];
  pageSize = 50;
  dataSource: MatTableDataSource<LuMediaType> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private mediaTypeService: MediaTypeService,
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
    this.mediaTypeService.apiMediaTypeGet().subscribe(
      {
        next: (resp?: LuMediaType[]) => this.subject$.next(resp),
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

  isAddOpen: boolean=false;
  createItem() {

    if (this.isAddOpen) return;
    this.isAddOpen=true;

    this.dialog.open(MediatypeEditComponent, {
      data: 0
    }).afterClosed().subscribe((mediaType: LuMediaType) => {
      /**
       * Item is the updated if the user pressed Save - otherwise it's null
       */
      this.isAddOpen=false;
      if (mediaType) {
        this.loadData();
      }
    });
  }
  isEditOpen: boolean=false;
  updateItem(mediaType: LuMediaType) {

    if (this.isEditOpen) return;

    this.isEditOpen=true;

    this.dialog.open(MediatypeEditComponent, {
      data: mediaType.mediaTypeID
    }).afterClosed().subscribe((mediaType: LuMediaType) => {
      /**
       * item is the updated,if the user pressed Save - otherwise it's null
       */
      this.isEditOpen=false;
      if (mediaType) {
        this.loadData();
      }
        
      
    });
  }



  deleteItem(mediaType: LuMediaType) {
    this.mediaTypeService.apiMediaTypeMediaTypeIdDelete(mediaType.mediaTypeID,).subscribe(
      {
        next: (resp?: any)=>  this.loadData(),
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
     });
  }




  ngOnDestroy() {
  }
}
