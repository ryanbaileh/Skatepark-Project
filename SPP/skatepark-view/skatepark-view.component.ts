import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { fadeInRightAnimation } from 'src/@shell/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@shell/animations/fade-in-up.animation';
import { SpotService } from 'src/services/api/spot.service';
import { Spot } from 'src/services/model/spot';
import { BASE_PATH } from '../../../services/variables';
import { SharedService } from 'src/services/shared.service';
import { Media } from 'src/services/model/media';
import { SpotAttribute } from 'src/services';
import { SkateparkEditComponent } from '../skatepark-edit/skatepark-edit.component';

import { MatDialog } from '@angular/material/dialog';
import { SkateparkEditAttributeComponent } from '../skatepark-editattribute/skatepark-editattribute.component';


@Component({
  selector: 'spp-skatepark-view',
  templateUrl: './skatepark-view.component.html',
  styleUrls: ['./skatepark-view.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class SkateparkViewComponent implements OnInit, AfterViewInit {
  public id: number = -1;
  public data: Spot = {};

  public contructionDisplay: string = "";
  public sizeAttribute: SpotAttribute;
  public designerAttribute: SpotAttribute;
  public APIBasePath: string = '';
  private slideIndex = 0;

  options: google.maps.MapOptions;
  markerOptions: google.maps.MarkerOptions;

  @ViewChildren('slides') slides: QueryList<ElementRef>;
  @ViewChildren('dots') dots: QueryList<ElementRef>;
  gatedAttribute: SpotAttribute;
  paidAttribute: SpotAttribute;
  helmetAttribute: SpotAttribute;
  restrictedAttribute: SpotAttribute;
  supervisedAttribute: SpotAttribute;
  retailAttribute: SpotAttribute;
  lightsAttribute: SpotAttribute;
  shadeAttribute: SpotAttribute;
  waterAttribute: SpotAttribute;
  restroomsAttribute: SpotAttribute;
  ridersAllowedAttribute: SpotAttribute;
  constructor(
    @Inject(BASE_PATH) APIBasePath: string,
    private route: ActivatedRoute,
    private skateparkService: SpotService,
    private sharedService: SharedService,
    private renderer: Renderer2,
    private dialog: MatDialog
  ) {

    this.APIBasePath = APIBasePath;
  }
  /////////////////////////////////////////////////////////////////////////
  ngOnInit(): void {

    this.route.params.forEach((params: Params) => {
      this.id = params['id'];
    });

    this.loadData();

  }
  /////////////////////////////////////////////////////////////////////////
  ngAfterViewInit() {
    this.showSlides(this.slideIndex);

    this.slides.changes.subscribe(_ =>
      this.showSlides(this.slideIndex));
  }
  /////////////////////////////////////////////////////////////////////////

  

  /////////////////////////////////////////////////////////////////////////

  private loadData() {
    this.skateparkService.apiSkateparksSpotIdGet(this.id).subscribe(
      {
        next: (resp?: Spot) => {
          //Main data
          this.data = resp;

          //Construction display
          var constructionMatch = this.GetAttribute('construction');
          if (constructionMatch)
            this.contructionDisplay = this.toTitleCase(constructionMatch.spotAttributeValue);
          else
            this.contructionDisplay = 'Unknown';

          //Size display
          this.sizeAttribute = this.GetAttribute('size');

          //Design display
          this.designerAttribute = this.GetAttribute('designer');

          this.paidAttribute = this.GetAttribute('paid');
          this.gatedAttribute = this.GetAttribute('gated');
          this.helmetAttribute = this.GetAttribute('helmet required');
          this.restrictedAttribute = this.GetAttribute('restricted access');
          this.supervisedAttribute = this.GetAttribute('supervised');

          this.retailAttribute = this.GetAttribute('retail');
          this.lightsAttribute = this.GetAttribute('lights');
          this.shadeAttribute = this.GetAttribute('shade structure');
          this.waterAttribute = this.GetAttribute('water source');
          this.restroomsAttribute = this.GetAttribute('restrooms');

          this.ridersAllowedAttribute = this.GetAttribute('riders allowed');

          //Map
          this.options = {
            center: {
              lat: this.data.spotLat,
              lng: this.data.spotLong,
            },
            mapTypeId: 'satellite',
            zoom: 20,
            mapTypeControl: false,
            controlSize: 25

          };


          this.markerOptions = {
            position: {
              lat: this.data.spotLat,
              lng: this.data.spotLong
            },

          };

        },

        error: (err: HttpErrorResponse) => this.sharedService.handleUserResponseErrors(err)
      });
  }
  /////////////////////////////////////////////////////////////////////////
  public GetAttribute(attr: string): SpotAttribute {
    var results = this.data.attributeList.filter((obj) => {
      return obj.spotAttributeName.toLowerCase().trim() === attr;
    })
    if (results.length > 0)
      return results[0];
    else
      return null;

  }
  /////////////////////////////////////////////////////////////////////////
  public HasAttribute(attr: SpotAttribute): boolean {
    if (attr && attr.spotAttributeValue == 'Yes')
      return true;
    else
      return false;
  }

  /////////////////////////////////////////////////////////////////////////
  public IsRiderAllowed(rider: string): boolean {
    if (this.ridersAllowedAttribute && this.ridersAllowedAttribute.spotAttributeValue.includes(rider))
      return true;
    else
      return false;
  }
  private toTitleCase(str: string) {
    return str.toLowerCase().split(' ').map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }
  /////////////////////////////////////////////////////////////////////////
  // Next/previous controls
  public plusSlides(n) {
    this.slideIndex += n
    this.showSlides(this.slideIndex);
  }
  /////////////////////////////////////////////////////////////////////////
  // Thumbnail image controls
  public currentSlide(n) {
    this.slideIndex = n;
    this.showSlides(this.slideIndex);

  }
  /////////////////////////////////////////////////////////////////////////
  private showSlides(n) {

    if (this.slides.length == 0) return;
    var _slides = this.slides.toArray();
    var _dots = this.dots.toArray();


    let i;
    if (n > _slides.length - 1) { this.slideIndex = _slides.length - 1 }
    if (n < 0) { this.slideIndex = 0 }

    for (i = 0; i < _slides.length; i++) {
      this.renderer.setStyle(_slides[i].nativeElement, 'display', 'none')
    }
    for (i = 0; i < _dots.length; i++) {
      _dots[i].nativeElement.className = _dots[i].nativeElement.className.replace(" active", "");
    }
    this.renderer.setStyle(_slides[this.slideIndex].nativeElement, 'display', 'block')
    _dots[this.slideIndex].nativeElement.className += " active";
  }

  /////////////////////////////////////////////////////////////////////////
  isEditOpen: boolean=false;
  editSpot() {
    if (this.isEditOpen) return;

    this.isEditOpen=true;


    this.dialog.open(SkateparkEditComponent, {
      data: this.id
    }).afterClosed().subscribe((spot: Spot) => {
      /*item is the updated,if the user pressed Save - otherwise it's null*/
      this.isEditOpen=false;
      if (spot) {
        this.loadData();
      }
    });
  }

  
  /////////////////////////////////////////////////////////////////////////
  editSpotAttribute() {
    if (this.isEditOpen) return;

    this.isEditOpen=true;


    this.dialog.open(SkateparkEditAttributeComponent, {
      data: this.id
    }).afterClosed().subscribe((spot: Spot) => {
      /*item is the updated,if the user pressed Save - otherwise it's null*/
      this.isEditOpen=false;
      if (spot) {
        this.loadData();
      }
    });
  }

}
