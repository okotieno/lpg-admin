import { Component, Input } from '@angular/core';

@Component({
  selector: 'lpg-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent {
  @Input() linksTo = [''];
  @Input() footer = 'View users';
  @Input() value: string | number = 0;
  @Input() title = 'users';
  @Input() icon = 'warning';
  @Input() color = 'success';

}


