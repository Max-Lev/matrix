import { AfterViewInit, Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { delay, filter, take } from 'rxjs/operators';
import { LoginService } from './providers/login.service';
import { GoogleUser, User } from './models/user.model';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent implements AfterViewInit, OnInit {

  links = ['login', 'register'];

  @ViewChild('matTabGroup') matTabGroup!: MatTabGroup;

  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private loginService: LoginService) {

  }

  ngOnInit(): void {
    // this.getGoogleUser$();
    // this.loginService.auth$.subscribe(s => console.log(s))
  }

  ngAfterViewInit(): void {
    this.setDefaultTab();
    this.setActiveTab$();
  }

  

  setActiveTab$() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(d => {
      const path = this.activeRoute.snapshot.firstChild?.routeConfig?.path;
      const activeTab = this.matTabGroup._tabs['_results'].findIndex((tab: MatTab) => tab.textLabel === path);
      this.matTabGroup.selectedIndex = activeTab;
    });
  }

  setDefaultTab() {
    const path = this.activeRoute.snapshot.firstChild?.routeConfig?.path;
    const activeTab = this.matTabGroup._tabs.find(tab => tab.textLabel === path)!;
    // const activeTab = this.matTabGroup._tabs['_results'].findIndex((tab: MatTab) => tab.textLabel === path);
    this.matTabGroup.selectedIndex = activeTab.position!;
  }

  selectedTabChange(action: MatTabChangeEvent) {
    this.router.navigate([`${action.tab.textLabel}`], { relativeTo: this.activeRoute });
  }


}
