import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent {
  private data: DocumentListViewModel[] = [];

  constructor(private http: HttpClient, private snackbar: SnackbarService) {
    (async () => {
      if (!await this.loadData()) {
        snackbar.showError("Dokumente konnten nicht geladen werden")
      }
    })();
  }

  private loadData(): Promise<boolean> {
    return new Promise(success => {
      this.http.get<DocumentListViewModel[]>('api/documentlist').pipe(
        map(items => {
          return items.map(item => ({
            documentName: item.documentName,
            creationDate: new Date(item.creationDate),
            previewImage: new Blob()
          }));
        }),
      ).subscribe({
        next: (value) => {
          this.data = value;
          this.groupedAndSortedMetadata = this.groupAndSortByDay(this.data);
          success(true);
        }, error(err) {
          success(false);
        },
      });
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

    groupedItems.forEach(group => {
      group.items.reverse();
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

  public handleFileInput(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const fileList: FileList | null = fileInput.files;

    if (!fileList || fileList.length === 0) return;

    const filesArray: File[] = Array.from(fileList);

    const formData = new FormData();
    filesArray.forEach((file: File) => {
      formData.append('files', file, file.name);
    });

    this.http.post("api/documentlist", formData).subscribe({
      next: (value: any) => {
        this.snackbar.showSuccess(value.message);

        this.loadData();
      },
      error: (err) => {
        this.snackbar.showError(err.message);
      },
    })
  }

  public open() {
    console.log("123");

  }

  public async refreshData() {
    this.snackbar.showInfo("Ansicht wird aktualisiert...");

    if (await this.loadData()) {
      this.snackbar.showSuccess("Ansicht aktualisiert");
    } else {
      this.snackbar.showError("Ansicht konnte nicht aktualisiert werden");
    }
  }
}

export interface DocumentListViewModel {
  documentName: string;
  creationDate: Date;
  previewImage: Blob;
}