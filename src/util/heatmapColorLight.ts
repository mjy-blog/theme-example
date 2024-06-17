import { hsvToRgb } from './hsvToRgb';
import { lerp } from './lerp';

export function heatmapColorLight(
  hot: number,
): [r: number, g: number, b: number] {
  return hsvToRgb(
    lerp(2 / 3, 0, hot),
    lerp(1, 3 / 4, hot),
    lerp(2 / 3, 1, hot),
  );
}
