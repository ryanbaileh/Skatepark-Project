import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LuMediaType, MediaTypeService } from 'src/services';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'spp-spottype-edit',
  templateUrl: './mediatype-edit.component.html',
  styleUrls: ['./mediatype-edit.component.scss']
})
export class MediatypeEditComponent implements OnInit {

  @ViewChild('editForm') editForm: FormGroup;

  data: LuMediaType={};
  dataLoadCompleted: boolean=false;
  title: string = "Media Type"
  constructor(@Inject(MAT_DIALOG_DATA) public id: number,
              private dialogRef: MatDialogRef<MediatypeEditComponent>,
              private fb: FormBuilder,
              private mediaTypeService: MediaTypeService,
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

    this.mediaTypeService.apiMediaTypeIdGet(this.id,).subscribe(
        {
          next: (resp?: LuMediaType)=> this.GetById_Completed(resp),
          error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)

       });
  }

  /////////////////////////////////////////////////////////////////////////
  private GetById_Completed(resp: LuMediaType): void {
    this.data = resp;
    this.dataLoadCompleted=true;
  }

  /////////////////////////////////////////////////////////////////////////
  public save() {

    if (this.editForm.invalid) return;

    var action: any;

    if (this.data.mediaTypeID <= 0) {
      action = this.mediaTypeService.apiMediaTypePost(this.data);
    }
    else {
      action = this.mediaTypeService.apiMediaTypePut(this.data);
    }

    action.subscribe(
      {
        next: (resp?: LuMediaType)=>  this.dialogRef.close(this.data),
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
     });

  }
  public cancel(){
    this.dialogRef.close(null)
  }



}


