import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.page.html',
  styleUrls: ['./root.page.scss'],
})
export class RootPage implements OnInit {

  constructor(
    public authService: AuthenticationService
  ) { }

  ngOnInit() { }
}
