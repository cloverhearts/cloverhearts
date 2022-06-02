declare interface BlockItem {
  readonly id: string;
  readonly type: string;
  readonly href: string;
  readonly value: string;
  readonly attributes: string[];
  readonly children: BlockItem[];

  toHTML(): string;
}
