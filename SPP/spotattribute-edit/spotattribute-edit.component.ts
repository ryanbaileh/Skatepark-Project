import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LuSpotAttribute, SpotAttributeService } from 'src/services';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'spp-spotattribute-edit',
  templateUrl: './spotattribute-edit.component.html',
  styleUrls: ['./spotattribute-edit.component.scss']
})
export class SpotattributeEditComponent implements OnInit {

  @ViewChild('editForm') editForm: FormGroup;

  data: LuSpotAttribute={};
  dataLoadCompleted: boolean=false;
  title: string = "Spot Attribute"
  constructor(@Inject(MAT_DIALOG_DATA) public id: number,
              private dialogRef: MatDialogRef<LuSpotAttribute>,
              private fb: FormBuilder,
              private spotAttributeService: SpotAttributeService,
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

    this.spotAttributeService.apiSpotAttributeIdGet(this.id).subscribe(
        {
          next: (resp?: LuSpotAttribute)=> this.GetById_Completed(resp),
          error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)

       });
  }

  /////////////////////////////////////////////////////////////////////////
  private GetById_Completed(resp: LuSpotAttribute): void {
    this.data = resp;
    this.dataLoadCompleted=true;
  }

  /////////////////////////////////////////////////////////////////////////
  public save() {

    if (this.editForm.invalid) return;

    var action: any;

    if (this.data.spotAttributeID <= 0) {
      action = this.spotAttributeService.apiSpotAttributePost(this.data);
    }
    else {
      action = this.spotAttributeService.apiSpotAttributePut(this.data);
    }

    action.subscribe(
      {
        next: (resp?: LuSpotAttribute)=>  this.dialogRef.close(this.data),
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
     });

  }
  public cancel(){
    this.dialogRef.close(null)
  }



}

