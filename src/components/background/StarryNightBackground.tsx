import { StarField } from './StarField';
import { ShootingStar } from './ShootingStar';

export function StarryNightBackground() {
  return (
    <div className="absolute inset-0 night-sky-gradient overflow-hidden">
      <div className="moon-glow" />
      <div className="moon-core" />
      <StarField />
      <ShootingStar />
    </div>
  );
}
