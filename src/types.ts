// src/types.ts

export interface SimpleOptions {
  simpleText: string;
  showSeriesCounter: boolean;
  highlightColor: string;
  compactMode: boolean;
}

export const defaults: SimpleOptions = {
  simpleText: 'Default value of text input option',
  showSeriesCounter: true,
  highlightColor: '#3B82F6',
  compactMode: false,
};
