import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LuStatus, StatusService } from 'src/services';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'spp-status-edit',
  templateUrl: './status-edit.component.html',
  styleUrls: ['./status-edit.component.scss']
})
export class StatusEditComponent implements OnInit {

  @ViewChild('editForm') editForm: FormGroup;

  data: LuStatus={};
  dataLoadCompleted: boolean=false;
  title: string = "Status"
  constructor(@Inject(MAT_DIALOG_DATA) public id: number,
              private dialogRef: MatDialogRef<StatusEditComponent>,
              private fb: FormBuilder,
              private statusService: StatusService,
              private sharedService: SharedService) {
  }

  /////////////////////////////////////////////////////////////////////////
  ngOnInit() {

    this.dialogRef.updateSize('300px', 'auto');

    if (this.id < 0){
      this.title="Add " + this.title;
      
    }
    else{
      this.title="Edit " + this.title;
    }
    this.GetById();
  }

  /////////////////////////////////////////////////////////////////////////
  private GetById() {

    this.statusService.apiStatusIdGet(this.id,).subscribe(
        {
          next: (resp?: LuStatus)=> this.GetById_Completed(resp),
          error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)

       });
  }

  /////////////////////////////////////////////////////////////////////////
  private GetById_Completed(resp: LuStatus): void {
    this.data = resp;
    this.dataLoadCompleted=true;
  }

  /////////////////////////////////////////////////////////////////////////
  public save() {

    if (this.editForm.invalid) return;

    var action: any;

    if (this.id < 0) {
      action = this.statusService.apiStatusPost(this.data);
    }
    else {
      action = this.statusService.apiStatusPut(this.data);
    }

    action.subscribe(
      {
        next: (resp?: LuStatus)=>  this.dialogRef.close(this.data),
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
     });

  }
  public cancel(){
    this.dialogRef.close(null)
  }



}
