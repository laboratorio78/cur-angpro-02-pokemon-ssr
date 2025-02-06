import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-about',
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent {

}
