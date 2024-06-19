// angular import
import { Component } from '@angular/core';

// project import
import { BuyNowLinkService } from 'src/app/@theme/services/buy-now-link.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent {
  // public props
  navDataShow!: boolean;

  // constructor
  constructor(public productIdService: BuyNowLinkService) {}
}
