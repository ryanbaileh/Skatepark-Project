
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
import { AirLockService, Media, MediaService } from 'src/services';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'spp-media-airlock-list',
  templateUrl: './media-airlock-list.component.html',
  styleUrls: ['./media-airlock-list.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class MediaAirlockListComponent implements OnInit {

  @Input()
  columns: ListColumn[] = [
    { name: 'Description', property: 'mediaTitle', visible: true, isModelProperty: true },
    { name: 'Upload Date', property: 'uploadDateTime', visible: true, isModelProperty: true },
    { name: 'User', property: 'createdByUser', visible: true, isModelProperty: false },
    { name: 'Actions', property: 'actions', visible: true, isModelProperty: false }
  ] as ListColumn[];
  pageSize = 50;
  dataSource: MatTableDataSource<Media> | null;

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
    this.airlockService.apiSkateparksAdminMediaUnderReviewGet().subscribe(
      {
        next: (resp?: Media[]) => this.dataSource.data = resp,
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

  approveItem(media: Media) {

    media.reviewStatusID = 1; //Approved
    this.airlockService.apiSkateparksSpotIdMediaSetReviewStatusPut(media.spotID, media).subscribe(
      {
        next: (resp?: any) => this.loadData(),
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
      });
  }
  /////////////////////////////////////////////////////////////////////////
  rejectItem(media: Media) {
    media.reviewStatusID = 2; //Rejected
    this.airlockService.apiSkateparksSpotIdMediaSetReviewStatusPut(media.spotID, media).subscribe(
      {
        next: (resp?: any) => this.loadData(),
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
      });
  }
  ngOnDestroy() {
  }
}
