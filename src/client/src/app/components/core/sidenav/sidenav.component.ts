import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  public navElements: NavElement[] = [
    { elementText: "Übersicht", iconName: "home", route: "home" },
    { elementText: "Liste", iconName: "pageview", route: "browser" },
    { elementText: "Dateiablage", iconName: "format_list_numbered", "route": "stack" },
    { elementText: "Tags", iconName: "label", route: "tags" },
    { elementText: "Erinnerungen", iconName: "event", route: "reminders" },
    { elementText: "Einstellungen", iconName: "settings", route: "settings" },
  ];

  public toggledOpen: boolean = false;
  public opened: boolean = false;

  public toggle() {
    this.toggledOpen = !this.toggledOpen;

    this.opened = this.toggledOpen;
  }

  public onMouseEnter() {
    if (this.toggledOpen) return;

    this.opened = true;
  }

  public onMouseLeave() {
    if (this.toggledOpen) return;

    this.opened = false;
  }
}

interface NavElement {
  elementText: string;
  iconName: string;
  route: string;
}
