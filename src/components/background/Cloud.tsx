interface CloudProps {
  top: string;
  left: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  duration: number;
  opacity: number;
  delay: number;
}

export function Cloud({ top, left, size, duration, opacity, delay }: CloudProps) {
  const sizeMap = {
    sm: { width: 96, height: 40, bump1: 48, bump2: 56 },
    md: { width: 144, height: 56, bump1: 64, bump2: 80 },
    lg: { width: 192, height: 80, bump1: 80, bump2: 96 },
    xl: { width: 256, height: 96, bump1: 112, bump2: 128 },
  };

  const s = sizeMap[size];

  return (
    <div
      className="absolute"
      style={{
        top,
        left,
        width: s.width,
        height: s.height,
        opacity,
        animation: `float-cloud ${duration}s linear ${delay}s infinite`,
        willChange: 'transform',
      }}
    >
      <div
        className="absolute bg-white rounded-full opacity-90"
        style={{
          width: s.width,
          height: s.height,
          filter: 'blur(2px)',
        }}
      />
      <div
        className="absolute bg-white rounded-full opacity-90"
        style={{
          width: s.bump1,
          height: s.bump1,
          top: -s.bump1 * 0.4,
          left: s.width * 0.15,
          filter: 'blur(2px)',
        }}
      />
      <div
        className="absolute bg-white rounded-full opacity-90"
        style={{
          width: s.bump2,
          height: s.bump2,
          top: -s.bump2 * 0.4,
          right: s.width * 0.1,
          filter: 'blur(2px)',
        }}
      />
    </div>
  );
}
