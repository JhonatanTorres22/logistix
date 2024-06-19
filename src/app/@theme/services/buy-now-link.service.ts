import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuyNowLinkService {
  public buyNowLink: string;

  setBuyNowLink(urlValue: URLSearchParams): void {
    const singleValue = urlValue.get('isp');
    if (singleValue !== null && parseInt(singleValue) === 1) {
      this.buyNowLink = 'https://1.envato.market/XYAZnb';
    } else {
      this.buyNowLink = 'https://1.envato.market/zNkqj6';
    }
  }
}
