import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Spot, SpotService } from 'src/services';
import { SharedService } from 'src/services/shared.service';
import { SpotAttribute } from 'src/services/model/SpotAttribute'

@Component({
  selector: 'spp-skatepark-editattribute',
  templateUrl: './skatepark-editattribute.component.html',
  styleUrls: ['./skatepark-editattribute.component.scss']
})
export class SkateparkEditAttributeComponent implements OnInit {

  @ViewChild('editForm') editForm: FormGroup;

  data: Spot = {};
  dataLoadCompleted: boolean = false;
  title: string = "Skatepark Attributes";
  spotSize: string = "Skatepark Size"
  spotDesigner: string = "Skatepark Designer "

  //atrributes
  spotPaid: boolean = false;
  shadeStructure: boolean = false;
  spotSupervised: boolean = false;
  spotGated: boolean = false;
  spotRestrictedAccess: boolean = false;
  spotHelmetRequired: boolean = false;
  spotRetail: boolean = false;
  spotLights: boolean = false;
  SpotWater: boolean = false;
  SpotRestrooms: boolean = false;
  SpotSkateboardAllowed: boolean = false;
  SpotInlineAllowed: boolean = false;
  SpotScooterAllowed: boolean = false;
  SpotBicycleAllowed: boolean = false;
  SpotWheelchairAllowed: boolean = false;
  SpotRollerAllowed: boolean = false;



  SpotRiders: string = "";
  designer: string = "";
  size: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public id: number,
    private dialogRef: MatDialogRef<SkateparkEditAttributeComponent>,
    private fb: FormBuilder,
    private spotService: SpotService,
    private sharedService: SharedService
  ) {

  }



  /////////////////////////////////////////////////////////////////////////
  ngOnInit() {

    this.dialogRef.updateSize('850px', 'auto');
    this.title = "Edit " + this.title;
    this.GetById();
  }



  /////////////////////////////////////////////////////////////////////////
  private GetById() {

    this.spotService.apiSkateparksSpotIdGet(this.id,).subscribe(
      {
        next: (resp?: Spot) => this.GetById_Completed(resp),
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)

      });
  }


  private GetById_Completed(resp: Spot): void {
    this.data = resp;
    this.dataLoadCompleted = true;

    this.spotPaid = this.getAttribute(20) === "Yes";
    this.shadeStructure = this.getAttribute(13) === "Yes";
    this.spotSupervised = this.getAttribute(15) === "Yes";
    this.spotGated = this.getAttribute(5) === "Yes";
    this.spotRestrictedAccess = this.getAttribute(103) === "Yes";
    this.spotHelmetRequired = this.getAttribute(7) === "Yes";
    this.spotRetail = this.getAttribute(102) === "Yes";
    this.spotLights = this.getAttribute(8) === "Yes";
    this.SpotWater = this.getAttribute(22) === "Yes";
    this.SpotRestrooms = this.getAttribute(21) === "Yes";

    //********************* */
    this.SpotSkateboardAllowed = this.getAttribute(19).includes('skateboard');
    //TODO: Do rest of the toggles
    //********************* */


    this.designer = this.getAttribute(4);
    this.size = this.getAttribute(14);


  }

  /////////////////////////////////////////////////////////////////////////
  private getAttribute(spotAttributeId: number): string {

    var matches = this.data.attributeList.filter(item => item.spotAttributeId === spotAttributeId)
    if (matches.length > 0)
      return matches[0].spotAttributeValue;
  }



  /////////////////////////////////////////////////////////////////////////
// To remove last comma 
  public removeComma(strng){
    var comma = strng.lastIndexOf(",");
    var deleteComma = strng.substring(0,comma)
    return deleteComma

  }
  /////////////////////////////////////////////////////////////////////////
  public save() {

    if (this.editForm.invalid) return;

    var action: any;

    //Set Paid
    this.updateAttribute(this.spotPaid, 20);
    this.updateAttribute(this.shadeStructure, 13);
    this.updateAttribute(this.spotSupervised, 15);
    this.updateAttribute(this.spotGated, 5);
    this.updateAttribute(this.spotRestrictedAccess, 103);
    this.updateAttribute(this.spotHelmetRequired, 7);
    this.updateAttribute(this.spotRetail, 102);
    this.updateAttribute(this.spotLights, 8);
    this.updateAttribute(this.SpotWater, 22);
    this.updateAttribute(this.SpotRestrooms, 21);



    //********************* */

    var riders = "";
    //TODO: build riders string
    //would be something like: skateboard,inline,scooter,bicycle,wheelchair,roller

    if (this.SpotSkateboardAllowed)
      riders += "skateboard, inline, scooter, bicycle, wheelchait, roller,";
      this.removeComma(riders)
      



    this.updateAttribute(this.SpotRestrooms, 19);

    //********************* */
    action = this.spotService.apiSkateparksPut(this.data);



    action.subscribe(
      {
        next: (resp?: Spot) => this.dialogRef.close(this.data),
        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
      });

  }

  private updateAttribute(attributeValue: boolean, spotAttributeId: number): void {
    var matches = this.data.attributeList.filter(item => item.spotAttributeId === spotAttributeId)
    if (matches.length > 0)
      matches[0].spotAttributeValue = attributeValue ? "Yes" : "No";
    else {
      if (attributeValue) {
        var newAttribute = <SpotAttribute>{
          spotAttributeId: spotAttributeId,
          spotAttributeValue: "Yes"
        };
        this.data.attributeList.push(newAttribute);
      }

    }
  }

  public cancel() {
    this.dialogRef.close(null)
  }



}

