import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export const TITLE = 'Where in the world?';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private titleService: Title, private metaService: Meta) {}

  setTitle(title: string) {
    this.titleService.setTitle(title);
  }

  setMetaTag(name: string, content: string) {
    this.metaService.updateTag({ name, content });
  }
}
