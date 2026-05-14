import { Cloud } from './Cloud';

export function SkyRainBackground() {
  return (
    <div className="absolute inset-0 sky-gradient wet-screen overflow-hidden">
      <Cloud top="10%" left="-200px" size="lg" duration={35} opacity={0.8} delay={0} />
      <Cloud top="25%" left="-200px" size="md" duration={28} opacity={0.7} delay={5} />
      <Cloud top="5%" left="-200px" size="xl" duration={45} opacity={0.6} delay={10} />
      <Cloud top="18%" left="-200px" size="sm" duration={25} opacity={0.75} delay={15} />
      <Cloud top="30%" left="-200px" size="lg" duration={40} opacity={0.65} delay={20} />
      <Cloud top="8%" left="-200px" size="md" duration={32} opacity={0.7} delay={25} />
    </div>
  );
}
