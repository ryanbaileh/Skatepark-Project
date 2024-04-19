import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LuSpotType, SpotTypeService } from 'src/services';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'spp-spottype-edit',
  templateUrl: './spottype-edit.component.html',
  styleUrls: ['./spottype-edit.component.scss']
})
export class SpottypeEditComponent implements OnInit {

  @ViewChild('editForm') editForm: FormGroup;

  data: LuSpotType={};
  dataLoadCompleted: boolean=false;
  title: string = "Spot Type"
  constructor(@Inject(MAT_DIALOG_DATA) public id: number,
              private dialogRef: MatDialogRef<SpottypeEditComponent>,
              private fb: FormBuilder,
              private spotTypeService: SpotTypeService,
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

    this.spotTypeService.apiSpotTypeIdGet(this.id,).subscribe(
        {
          next: (resp?: LuSpotType)=> this.GetById_Completed(resp),
          error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)

       });
  }

  /////////////////////////////////////////////////////////////////////////
  private GetById_Completed(resp: LuSpotType): void {
    this.data = resp;
    this.dataLoadCompleted=true;
  }

  /////////////////////////////////////////////////////////////////////////
  public save() {

    if (this.editForm.invalid) return;

    var action: any;

    if (this.id <= 0) {
      action = this.spotTypeService.apiSpotTypePost(this.data);
    }
    else {
      action = this.spotTypeService.apiSpotTypePut(this.data);
    }

    action.subscribe(
      {
        next: (resp?: LuSpotType)=>  this.dialogRef.close(this.data),
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
     });

  }
  public cancel(){
    this.dialogRef.close(null)
  }



}


