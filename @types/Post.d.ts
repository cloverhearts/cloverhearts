declare interface PostTag {
  readonly id: string;
  readonly name: string;
  readonly color: string;
}

declare interface PostItem {
  readonly id: string;
  readonly title: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly subject: PostTag;
  readonly keywords: PostTag[];
}
