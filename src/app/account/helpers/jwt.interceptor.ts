import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authservice: AuthService ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            const currentUser = this.authservice.accessToken;
            if(currentUser) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser}`
                    }
                });
            }
        return next.handle(request);
    }

}
