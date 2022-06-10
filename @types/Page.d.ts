declare interface Page extends PostItem {
  readonly content: BlockItem[];

  toHTML(): string;
}
