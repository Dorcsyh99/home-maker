import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  homes: any = [];

  ngOnInit(): void {
    this.homes = this.searchService.result;
  }



}
