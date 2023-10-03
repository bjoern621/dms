import { Component } from '@angular/core';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  data = data;

  folderPath = '/path/to/your/folder';
  folderContent: string[] = [];

  constructor() { }

  ngOnInit() {
    this.loadFolderContent();
  }

  async loadFolderContent() {
    try {
      // this.folderContent = await this.fileReader.readFolderContent(this.folderPath);
    } catch (err) {
      console.error('Error reading folder content:', err);
    }
  }

  groupedAndSortedMetadata: { date: Date; items: Metadata[] }[] = this.groupAndSortByDay(
    this.data
  );

  groupAndSortByDay(items: Metadata[]): { date: Date; items: Metadata[] }[] {
    const groupedItems: { date: Date; items: Metadata[] }[] = [];

    // Sort the items by history (date created) in descending order
    items.sort((a, b) => b.history.getTime() - a.history.getTime());

    items.forEach((item) => {
      const itemDateString = item.history.toDateString();
      const existingGroup = groupedItems.find((group) =>
        group.date.toDateString() === itemDateString
      );

      if (existingGroup) {
        existingGroup.items.push(item);
      } else {
        groupedItems.push({ date: item.history, items: [item] });
      }
    });

    return groupedItems;
  }

  public getDateString(date: Date) {
    date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    let now = new Date();
    let today = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    let yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)

    switch (date.getUTCDate()) {
      case today.getUTCDate():
        return 'Heute'
      case yesterday.getUTCDate():
        return 'Gestern'
      default:
        return date.toLocaleDateString()
    }
  }
}

export interface Metadata {
  fileName: string;
  fileType: string;
  tags?: string[];
  history: Date;
  importedFrom: string
}

const data: Metadata[] = [
  {
    fileName: 'myfile.pdf', fileType: 'Rechnung', importedFrom: 'Email',
    history: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
  },
  {
    fileName: 'myfile.pdf', fileType: 'Rechnung', importedFrom: 'Email',
    history: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
  },
  {
    fileName: 'myfile.pdf', fileType: 'Rechnung', importedFrom: 'Email',
    history: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
  },
  {
    fileName: 'myfile.pdf', fileType: 'Rechnung', importedFrom: 'Email',
    history: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
  },
  { fileName: 'myfile.pdf', fileType: 'Rechnung', importedFrom: 'Email', history: new Date(), },
  { fileName: 'myfile.pdf', fileType: 'Rechnung', importedFrom: 'Email', history: new Date(), },
  { fileName: 'myfile.pdf', fileType: 'Rechnung', importedFrom: 'Email', history: new Date(), },
  { fileName: 'myfile.pdf', fileType: 'Rechnung', importedFrom: 'Email', history: new Date(), },
  { fileName: 'myfile.pdf', fileType: 'Rechnung', importedFrom: 'Email', history: new Date(), },
  { fileName: 'myfile.pdf', fileType: 'Rechnung', importedFrom: 'Email', history: new Date('2023/09/10'), },
  { fileName: 'myfile.pdf', fileType: 'Rechnung', importedFrom: 'Email', history: new Date('2023/09/10'), },
  { fileName: 'myfile.pdf', fileType: 'Rechnung', importedFrom: 'Email', history: new Date('2023/09/8'), },
  { fileName: 'myfile.pdf', fileType: 'Rechnung', importedFrom: 'Email', history: new Date('2023/09/7'), },
  { fileName: 'myfile.pdf', fileType: 'Rechnung', importedFrom: 'Email', history: new Date('2023/09/7'), },
  { fileName: 'myfile.pdf', fileType: 'Rechnung', importedFrom: 'Email', history: new Date('2023/09/7'), },
  { fileName: 'myfile.pdf', fileType: 'Rechnung', importedFrom: 'Email', history: new Date('2023/07/7'), },
]
