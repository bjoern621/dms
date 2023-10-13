import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, map, retry, throwError } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  private data: DocumentListViewModel[] = [];

  constructor(http: HttpClient, snackbar: SnackbarService) {
    http.get<DocumentListViewModel[]>('api/documentlist').pipe(
      map(items => {
        return items.map(item => ({
          documentName: item.documentName,
          creationDate: new Date(item.creationDate)
        }));
      }),
      retry(3),
      catchError((error: HttpErrorResponse) => {
        snackbar.showError(error.message);
        throw new Error(error.message);
      }),
    ).subscribe({
      next: (value) => {
        this.data = value;
        this.groupedAndSortedMetadata = this.groupAndSortByDay(this.data);
      },
    });
  }

  public groupedAndSortedMetadata: { date: Date; items: DocumentListViewModel[] }[] = [];

  private groupAndSortByDay(items: DocumentListViewModel[]): { date: Date; items: DocumentListViewModel[] }[] {
    const groupedItems: { date: Date; items: DocumentListViewModel[] }[] = [];

    // Sort the items by history (date created) in descending order
    items.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());

    items.forEach((item) => {
      const itemDateString = item.creationDate.toDateString();
      const existingGroup = groupedItems.find((group) =>
        group.date.toDateString() === itemDateString
      );

      if (existingGroup) {
        existingGroup.items.push(item);
      } else {
        groupedItems.push({ date: item.creationDate, items: [item] });
      }
    });

    return groupedItems;
  }

  public getDateString(date: Date) {
    let now = new Date();
    let todayString = now.toDateString();
    let yesterdayString = new Date(now.getTime() - 24 * 60 * 60 * 1000).toDateString();

    switch (date.toDateString()) {
      case todayString:
        return 'Heute'
      case yesterdayString:
        return 'Gestern'
      default:
        return date.toLocaleDateString()
    }
  }

  public openUploadDialog() {

  }
}

export interface DocumentListViewModel {
  documentName: string;
  creationDate: Date;
}