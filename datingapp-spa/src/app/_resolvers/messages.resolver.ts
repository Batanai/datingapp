import { AuthService } from './../_services/auth.service';
import { Message } from './../_models/Message';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { User } from '../_models/User';
import { Observable, of } from 'rxjs';

@Injectable()
export class MessagesResolver implements Resolve<Message[]>{
  pageNumber = 1;
  pageSize = 5;
  messageContainer = 'Unread';

  constructor(private userService: UserService, private authService: AuthService,
              private router: Router, private alertify: AlertifyService){}

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userService.getMessages(this.authService.decodedToken.nameid,
        this.pageNumber, this.pageSize, this.messageContainer).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving messages');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }

}
