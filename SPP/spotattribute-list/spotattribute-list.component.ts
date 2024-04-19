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
import { LuSpotAttribute, SpotAttributeService } from 'src/services';
import { SharedService } from 'src/services/shared.service';
import { SpotattributeEditComponent } from '../spotattribute-edit/spotattribute-edit.component';



@Component({
  selector: 'spp-spotattribute-list',
  templateUrl: './spotattribute-list.component.html',
  styleUrls: ['./spotattribute-list.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class SpotattributeListComponent implements OnInit, AfterViewInit, OnDestroy {

  subject$: ReplaySubject<LuSpotAttribute[]> = new ReplaySubject<LuSpotAttribute[]>(1);
  data$: Observable<LuSpotAttribute[]> = this.subject$.asObservable();
  skateparks: LuSpotAttribute[];

  @Input()
  columns: ListColumn[] = [

    { name: 'Spot Attribute Name', property: 'spotAttributeName', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true, isModelProperty: false }
  ] as ListColumn[];
  pageSize = 50;
  dataSource: MatTableDataSource<LuSpotAttribute> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private spotAttributeService: SpotAttributeService,
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
    this.spotAttributeService.apiSpotAttributeGet().subscribe(
      {
        next: (resp?: LuSpotAttribute[]) => this.subject$.next(resp),
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

    this.dialog.open(SpotattributeEditComponent, {
      data: 0
    }).afterClosed().subscribe((spotStatus: LuSpotAttribute) => {
      /**
       * Item is the updated if the user pressed Save - otherwise it's null
       */
      this.isAddOpen=false;
      if (spotStatus) {
        this.loadData();
      }
    });
  }

  isEditOpen: boolean=false
  updateItem(spotAttribute: LuSpotAttribute) {

    if (this.isEditOpen) return;

    this.isEditOpen=true;

    this.dialog.open(SpotattributeEditComponent, {
      data: spotAttribute.spotAttributeID
    }).afterClosed().subscribe((spotAttribute: LuSpotAttribute) => {
      /**
       * item is the updated,if the user pressed Save - otherwise it's null
       */
      this.isEditOpen=false;
      if (spotAttribute) {
        this.loadData();
      }
    });
  }

  deleteItem(spotStatus: LuSpotAttribute) {
    this.spotAttributeService.apiSpotAttributeSpotAttributeIdDelete(spotStatus.spotAttributeID).subscribe(
      {
        next: (resp?: any)=>  this.loadData(),
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
     });
  }




  ngOnDestroy() {
  }
}
