
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { filter, Observable, Observer, ReplaySubject } from 'rxjs';
import { fadeInRightAnimation } from 'src/@shell/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@shell/animations/fade-in-up.animation';
import { ListColumn } from 'src/@shell/shared/list/list-column.model';
import { AirLockService, SpotReview, SpotReviewService } from 'src/services';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'spp-review-airlock-list',
  templateUrl: './review-airlock-list.component.html',
  styleUrls: ['./review-airlock-list.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ReviewAirlockListComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  columns: ListColumn[] = [


    { name: 'Review', property: 'reviewText', visible: true, isModelProperty: true },
    { name: 'Rating', property: 'rating', visible: true, isModelProperty: true },
    { name: 'User', property: 'createdByUser', visible: true, isModelProperty: false },
    { name: 'Actions', property: 'actions', visible: true, isModelProperty: false }

  ] as ListColumn[];
  pageSize = 50;
  dataSource: MatTableDataSource<SpotReview> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private airlockService: AirLockService,
    private sharedService: SharedService) {
  }

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
    this.airlockService.apiSkateparksAdminSpotReviewUnderReviewGet().subscribe(
      {
        next: (resp?: SpotReview[]) => this.dataSource.data = resp,
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

  approveItem(spotReview: SpotReview) {

    spotReview.reviewStatusID = 1; //Approved
    this.airlockService.apiSkateparksSpotIdSpotReviewSetReviewStatusPut(spotReview.spotId.toString(), spotReview).subscribe(
      {
        next: (resp?: any) => this.loadData(),
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
      });
  }
  /////////////////////////////////////////////////////////////////////////
  rejectItem(spotReview: SpotReview) {
    spotReview.reviewStatusID = 2; //Rejected
    this.airlockService.apiSkateparksSpotIdSpotReviewSetReviewStatusPut(spotReview.spotId.toString(), spotReview).subscribe(
      {
        next: (resp?: any) => this.loadData(),
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
      });
  }


  ngOnDestroy() {
  }
}
