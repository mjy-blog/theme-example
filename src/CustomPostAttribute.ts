import { PostAttribute } from '@mjy-blog/theme-lib';

export interface CustomPostAttribute extends PostAttribute {
  // your custom post attributes goes here, like below:
  excerpt: string;
}
