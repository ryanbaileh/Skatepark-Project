import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInRightAnimation } from 'src/@shell/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@shell/animations/fade-in-up.animation';
import { ListColumn } from 'src/@shell/shared/list/list-column.model';
import { LuSpotType, SpotTypeService } from 'src/services';
import { SharedService } from 'src/services/shared.service';
import { SpottypeEditComponent } from '../spottype-edit/spottype-edit.component';

@Component({
  selector: 'spp-spottype-list',
  templateUrl: './spottype-list.component.html',
  styleUrls: ['./spottype-list.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class SpottypeListComponent implements OnInit, AfterViewInit, OnDestroy {

  /* class properties */
  @Input() columns: ListColumn[] = [
    { name: 'Spot Type Name', property: 'spotTypeName', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true, isModelProperty: false }
  ] as ListColumn[];

  pageSize = 50;

  dataSource: MatTableDataSource<LuSpotType> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /* class constructor with injectied objects */
  constructor(
    private dialog: MatDialog,
    private spotTypeService: SpotTypeService,
    private sharedService: SharedService) {
  }

 /////////////////////////////////////////////////////////////////////////
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

 /////////////////////////////////////////////////////////////////////////
  ngOnInit() {

    this.loadData();
    this.dataSource = new MatTableDataSource();

  }

   /////////////////////////////////////////////////////////////////////////
  private loadData() {
    this.spotTypeService.apiSpotTypeGet().subscribe(
      {
        next: (resp?: LuSpotType[]) => this.dataSource.data = resp,
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
      });
  }

 /////////////////////////////////////////////////////////////////////////
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }




 /////////////////////////////////////////////////////////////////////////
  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

   /////////////////////////////////////////////////////////////////////////
   isAddOpen: boolean=false;
  createItem() {
    if (this.isAddOpen) return;

    this.isAddOpen=true;


    this.dialog.open(SpottypeEditComponent, {
      data: 0
    }).afterClosed().subscribe((spotType: LuSpotType) => {
      /*item is the updated,if the user pressed Save - otherwise it's null*/
      this.isAddOpen=false;
      if (spotType) {
        this.loadData();
      }
    });
  }
 /////////////////////////////////////////////////////////////////////////
 

  isEditOpen: boolean=false;

  updateItem(spotType: LuSpotType) {

    if (this.isEditOpen) return;

    this.isEditOpen=true;


    this.dialog.open(SpottypeEditComponent, {
      data: spotType.spotTypeID
    }).afterClosed().subscribe((spotType: LuSpotType) => {
      this.isEditOpen=false;
      /*item is the updated,if the user pressed Save - otherwise it's null*/
      if (spotType) {
        this.loadData();
      }
    });

  }
 /////////////////////////////////////////////////////////////////////////
  deleteItem(spotType: LuSpotType) {
    this.spotTypeService.apiSpotTypeSpotTypeIdDelete(spotType.spotTypeID,).subscribe(
      {
        next: (resp?: any)=>  this.loadData(),
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
     });
  }

 /////////////////////////////////////////////////////////////////////////
 ngOnDestroy() {
}


}
