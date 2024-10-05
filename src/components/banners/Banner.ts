import { ReactElement } from 'react';

export interface Banner {
  content: ReactElement;
  backgroundColorOnDarkTheme: string;
  backgroundColorOnLightTheme: string;
}
