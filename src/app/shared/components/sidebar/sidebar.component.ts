import { Component } from '@angular/core';
import { GiftsService } from '../../../gifts/services/gifts.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private giftService: GiftsService) { }

  get tags():string[] {
    return this.giftService.tagsHistory;
  }

  filterByTag(tag: string) {
    this.giftService.searchTag(tag);
  }

}
