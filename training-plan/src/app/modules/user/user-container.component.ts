import { AfterViewInit, Component, inject, OnDestroy, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';
import { LoginService } from './providers/login.service';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss'],
  providers:[LoginComponent]
})
export class UserContainerComponent implements AfterViewInit, OnInit ,OnDestroy{

  links = ['login', 'register'];

  @ViewChild('matTabGroup') matTabGroup!: MatTabGroup;

  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private loginService: LoginService,private loginComponent:LoginComponent
  ) {

  }
  ngOnDestroy(): void {
    this.loginService.loggedIn = true;
    this.loginComponent.ngOnDestroy();
  }

  ngOnInit(): void {
    
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
    this.matTabGroup.selectedIndex = activeTab.position!;
  }

  selectedTabChange(action: MatTabChangeEvent) {
    this.router.navigate([`${action.tab.textLabel}`], { relativeTo: this.activeRoute });
  }


}
