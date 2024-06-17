import { hsvToRgb } from './hsvToRgb';
import { lerp } from './lerp';

export function heatmapColorDark(
  hot: number,
): [r: number, g: number, b: number] {
  return hsvToRgb(
    lerp(2 / 3, 0, hot),
    lerp(3 / 4, 1, hot),
    lerp(1 / 3, 2 / 3, hot),
  );
}
