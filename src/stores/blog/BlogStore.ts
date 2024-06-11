import { Post } from '@mjy-blog/theme-lib';

import { CustomPostAttribute } from '../../CustomPostAttribute';
import { BlogState } from './BlogState';

export interface BlogStore extends BlogState {
  visit: (newPost?: Post<CustomPostAttribute>) => void;
}
