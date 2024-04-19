import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LuSpotStatus, SpotStatusService } from 'src/services';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'spp-spotstatus-edit',
  templateUrl: './spotstatus-edit.component.html',
  styleUrls: ['./spotstatus-edit.component.scss']
})
export class SpotstatusEditComponent implements OnInit {

  @ViewChild('editForm') editForm: FormGroup;

  data: LuSpotStatus={};
  dataLoadCompleted: boolean=false;
  title: string = "Spot Status"
  constructor(@Inject(MAT_DIALOG_DATA) public id: number,
              private dialogRef: MatDialogRef<SpotstatusEditComponent>,
              private fb: FormBuilder,
              private spotStatusService: SpotStatusService,
              private sharedService: SharedService) {
  }

  /////////////////////////////////////////////////////////////////////////
  ngOnInit() {

    this.dialogRef.updateSize('300px', 'auto');

    if (this.id <= 0){
      this.title="Add " + this.title;
    }
    else{
      this.title="Edit " + this.title;
    }
    this.GetById();
  }

  /////////////////////////////////////////////////////////////////////////
  private GetById() {

    this.spotStatusService.apiSpotStatusIdGet(this.id,).subscribe(
        {
          next: (resp?: LuSpotStatus)=> this.GetById_Completed(resp),
          error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)

       });
  }

  /////////////////////////////////////////////////////////////////////////
  private GetById_Completed(resp: LuSpotStatus): void {
    this.data = resp;
    this.dataLoadCompleted=true;
  }

  /////////////////////////////////////////////////////////////////////////
  public save() {

    if (this.editForm.invalid) return;

    var action: any;

    if (this.data.spotStatusID <= 0) {
      action = this.spotStatusService.apiSpotStatusPost(this.data);
    }
    else {
      action = this.spotStatusService.apiSpotStatusPut(this.data);
    }

    action.subscribe(
      {
        next: (resp?: LuSpotStatus)=>  this.dialogRef.close(this.data),
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
     });

  }
  public cancel(){
    this.dialogRef.close(null)
  }



}
