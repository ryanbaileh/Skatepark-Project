import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { forEach } from 'lodash-es';
import { filter, Observable, Observer, ReplaySubject } from 'rxjs';
import { fadeInRightAnimation } from 'src/@shell/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@shell/animations/fade-in-up.animation';
import { ListColumn } from 'src/@shell/shared/list/list-column.model';
import { Spot, SpotService } from 'src/services';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'spp-skatepark-list',
  templateUrl: './skatepark-list.component.html',
  styleUrls: ['./skatepark-list.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class SkateparkListComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  columns: ListColumn[] = [

    { name: 'Name', property: 'spotName', visible: true, isModelProperty: true },
    { name: 'Street', property: 'spotAddress', visible: true, isModelProperty: true },
    { name: 'Zipcode', property: 'spotZIP', visible: true, isModelProperty: true },
    { name: 'City', property: 'spotCity', visible: true, isModelProperty: true },
    { name: 'State', property: 'spotState', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true, isModelProperty: false }
  ] as ListColumn[];
  pageSize = 50;
  dataSource: MatTableDataSource<Spot> | null;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private skateparkService: SpotService,
    private sharedService: SharedService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  ///////////////////////////////////////////////////////////////////////// dependency injection 
  ngOnInit() {

    this.loadData();
    this.dataSource = new MatTableDataSource();


  }

  /////////////////////////////////////////////////////////////////////////
  private loadData() {
    this.skateparkService.apiSkateparksGet().subscribe(
      {
        next: (resp?: Spot[]) => {
          this.dataSource.data = resp;
        },

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

  updateItem(spot: Spot) {

    this.router.navigateByUrl(`skatepark-view/${spot.spotID}`);
  }
  ngOnDestroy() {
  }
}
