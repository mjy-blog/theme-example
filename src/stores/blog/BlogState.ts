import { Post } from '@mjy-blog/theme-lib';
import { CustomPostAttribute } from '../../CustomPostAttribute';

export interface BlogState {
  currentPost?: Post<CustomPostAttribute>;
}
