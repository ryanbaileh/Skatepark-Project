import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Spot, SpotService } from 'src/services';
import { SharedService } from 'src/services/shared.service';


@Component({
  selector: 'spp-skatepark-edit',
  templateUrl: './skatepark-edit.component.html',
  styleUrls: ['./skatepark-edit.component.scss']
})
export class SkateparkEditComponent implements OnInit {

  @ViewChild('editForm') editForm: FormGroup;

  data: Spot = {};
  dataLoadCompleted: boolean = false;
  title: string = "Skatepark Info";
  spotName: string = "Name";
  spotNickName: string = "Nick Name";
  spotAddress: string = "Address";
  spotCity: string = "City";
  spotZIP: string = "Zip Code";
  spotCountry: string = "Country";
  spotPhone: string = "Phone Number ";
  spotWEBURL: string = "URL";




  constructor(@Inject(MAT_DIALOG_DATA) public id: number,
    private dialogRef: MatDialogRef<SkateparkEditComponent>,
    private fb: FormBuilder,
    private spotService: SpotService,
    private sharedService: SharedService
  ) {

  }



  /////////////////////////////////////////////////////////////////////////
  ngOnInit() {

    this.dialogRef.updateSize('750px', 'auto');
    

    if (this.id <= 0) {
      this.title = "Add " + this.title;
    }
    else {
      this.title = "Edit " + this.title;
    }

    this.GetById();
  }






  /////////////////////////////////////////////////////////////////////////
  private GetById() {

      this.spotService.apiSkateparksSpotIdGet(this.id,).subscribe(
          {
            next: (resp?: Spot)=> this.GetById_Completed(resp),
            error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)

         });
    }

    /////////////////////////////////////////////////////////////////////////
    private GetById_Completed(resp: Spot): void {
      this.data = resp;
      this.dataLoadCompleted=true;
    }

  /////////////////////////////////////////////////////////////////////////
  public save() {

    if (this.editForm.invalid) return;

    var action: any;
    action = this.spotService.apiSkateparksPut(this.data);



    action.subscribe(
      {
        next: (resp?: Spot) => this.dialogRef.close(this.data),
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
      });

  }
  public cancel() {
    this.dialogRef.close(null)
  }



}
