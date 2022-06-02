declare interface BlockItem {
  readonly id: string;
  readonly children: BlockItem[];
  readonly type: string;
  readonly href: string;
  readonly value: string;
  readonly attributes: string[];

  public abstract toHTML(): string;
}
