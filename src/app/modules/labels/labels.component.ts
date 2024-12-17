import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrl: './labels.component.scss'
})
export class LabelsComponent {

  label: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.data.subscribe(data => {
      this.label = data['label'];
      this.redirectToFullUrl();
    });
  }

  redirectToFullUrl(): void {
    if (this.label && this.label.fullUrl) {
      window.location.href = this.label.fullUrl;
    }
  }
}
