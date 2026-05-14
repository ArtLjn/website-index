import { useTheme } from '../../lib/theme';
import { SkyRainBackground } from './SkyRainBackground';
import { StarryNightBackground } from './StarryNightBackground';

export function BackgroundLayer() {
  const { isDarkMode } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className={`absolute inset-0 transition-opacity duration-800 ${
          isDarkMode ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <SkyRainBackground />
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-800 ${
          isDarkMode ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <StarryNightBackground />
      </div>
    </div>
  );
}
