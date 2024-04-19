import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';


@Pipe({
    name: 'secureImage'
})
export class SecureImagePipe implements PipeTransform {

    constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

    transform(url): Observable<SafeUrl> {
         var req =this.http
            .get(url, { responseType: 'blob' ,headers:
            {DeviceId: 'GDB',
            ApplicationKey: 'GDB'
            }})
            .pipe(map(val =>
              this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val)))
              );

            return req;
    }

}
