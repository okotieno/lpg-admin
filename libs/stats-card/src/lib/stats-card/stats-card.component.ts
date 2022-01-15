import { Component, Input } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpBackend, HttpClient } from "@angular/common/http";

@Component({
  selector: 'lpg-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss'],
})
export class StatsCardComponent {
  @Input() linksTo = [''];
  @Input() footer = 'View users';
  @Input() value: string | number = 0;
  @Input() title = 'users';
  @Input() icon?: string;
  @Input() svgIcon?: string;
  @Input() color: 'warn' | 'danger' | 'primary' | 'accent' | 'success' = 'primary';
  @Input() linksToQueryParams = {};

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `active-user`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/active-user.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `inactive-user`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/inactive-user.svg")
    );
  }

}


