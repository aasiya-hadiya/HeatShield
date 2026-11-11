import React from 'react';

interface DubaiSkylineProps {
  className?: string;
  fillColor?: string;
  accentColor?: string;
  height?: number;
}

export const DubaiSkyline: React.FC<DubaiSkylineProps> = ({
  className = '',
  fillColor = '#173829',
  accentColor = '#24533d',
  height = 90,
}) => {
  return (
    <div className={`w-full overflow-hidden select-none pointer-events-none relative ${className}`}>
      <svg
        viewBox="0 0 1200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-auto block"
        style={{ maxHeight: `${height}px` }}
      >
        {/* Subtle background layer silhouettes */}
        <g opacity="0.35" fill={accentColor}>
          {/* Distant high-rise silhouettes */}
          <rect x="50" y="80" width="22" height="80" />
          <polygon points="61,55 50,80 72,80" />
          <rect x="140" y="65" width="28" height="95" />
          <rect x="230" y="50" width="34" height="110" />
          <polygon points="247,30 230,50 264,50" />
          <rect x="340" y="60" width="30" height="100" />
          <rect x="460" y="45" width="25" height="115" />
          <rect x="710" y="65" width="35" height="95" />
          <rect x="800" y="40" width="30" height="120" />
          <polygon points="815,20 800,40 830,40" />
          <rect x="910" y="70" width="26" height="90" />
          <rect x="1020" y="55" width="32" height="105" />
          <rect x="1110" y="75" width="24" height="85" />
        </g>

        {/* Primary Foreground Dubai Landmarks */}
        <g fill={fillColor}>
          {/* Left: Traditional Dubai Creek Dhow & Sheikh Mohammed Minaret */}
          <rect x="20" y="105" width="18" height="55" rx="1" />
          {/* Mosque Dome & Minaret */}
          <path d="M42 160V125Q54 112 66 125V160Z" />
          <circle cx="54" cy="112" r="3" />
          <rect x="72" y="75" width="12" height="85" />
          <polygon points="78,55 72,75 84,75" />
          <circle cx="78" cy="52" r="2.5" />

          {/* Low-rise traditional wind towers (Barjeel) */}
          <rect x="90" y="120" width="20" height="40" />
          <rect x="94" y="112" width="12" height="8" />

          {/* Dubai Frame Silhouette */}
          <path
            d="M125 160V60H165V160H155V72H135V160H125Z"
            fillRule="evenodd"
          />

          {/* Business Bay Towers */}
          <rect x="180" y="70" width="24" height="90" rx="2" />
          <rect x="210" y="85" width="18" height="75" />
          <polygon points="219,72 210,85 228,85" />

          {/* Emirates Towers (Twin Iconic Triangular Skyscrapers) */}
          {/* Tower 1 */}
          <polygon points="245,160 245,50 270,30 270,160" />
          {/* Tower 2 */}
          <polygon points="280,160 280,60 300,45 300,160" />

          {/* Modern highrises */}
          <rect x="315" y="80" width="22" height="80" />
          <rect x="345" y="55" width="30" height="105" rx="3" />
          <rect x="382" y="70" width="26" height="90" />

          {/* Museum of the Future Toroid silhouette */}
          <path
            d="M420 160V135C420 115 440 100 465 100C490 100 510 115 510 135V160H495C495 142 482 130 465 130C448 130 435 142 435 160H420Z"
            fillRule="evenodd"
          />

          {/* Modern Financial Center towers */}
          <rect x="525" y="65" width="28" height="95" />
          <polygon points="539,45 525,65 553,65" />

          {/* BURJ KHALIFA (Centerpiece Landmark) */}
          {/* Tiered base */}
          <rect x="590" y="125" width="40" height="35" />
          <rect x="596" y="95" width="28" height="30" />
          <rect x="602" y="65" width="16" height="30" />
          <rect x="606" y="40" width="8" height="25" />
          <rect x="608" y="20" width="4" height="20" />
          {/* Spire needle */}
          <line x1="610" y1="20" x2="610" y2="4" stroke={fillColor} strokeWidth="2.5" />
          <circle cx="610" cy="3" r="2" />

          {/* Downtown highrises */}
          <rect x="645" y="75" width="32" height="85" rx="2" />
          <rect x="685" y="60" width="25" height="100" />
          <polygon points="697,42 685,60 710,60" />

          {/* Cayan Tower (Twisting Tower) & Dubai Marina */}
          <path d="M725 160L732 75H755L748 160Z" />
          <rect x="765" y="68" width="28" height="92" rx="2" />

          {/* BURJ AL ARAB (Iconic Dhow Sail) */}
          <path
            d="M810 160V75C810 75 835 85 850 120C860 142 865 160 865 160H810Z"
          />
          {/* Helipad projection */}
          <rect x="798" y="92" width="22" height="4" rx="1" />
          {/* Mast spine */}
          <rect x="808" y="60" width="4" height="100" />
          <polygon points="810,48 808,60 812,60" />

          {/* Jumeirah Beach & Canal Bridges */}
          <path d="M875 160V140Q905 125 935 140V160Z" />
          <rect x="945" y="80" width="26" height="80" />
          <polygon points="958,62 945,80 971,80" />

          {/* Deira & Creek Traditional Minarets */}
          <rect x="985" y="90" width="14" height="70" />
          <polygon points="992,72 985,90 999,90" />
          <rect x="1010" y="70" width="32" height="90" rx="3" />
          <rect x="1050" y="85" width="24" height="75" />

          {/* Dubai Eye / Ain Dubai Ferris Wheel outline on the right */}
          <circle cx="1110" cy="115" r="32" stroke={fillColor} strokeWidth="3.5" fill="none" />
          <line x1="1110" y1="115" x2="1110" y2="160" stroke={fillColor} strokeWidth="4" />
          <line x1="1090" y1="160" x2="1110" y2="115" stroke={fillColor} strokeWidth="3" />
          <line x1="1130" y1="160" x2="1110" y2="115" stroke={fillColor} strokeWidth="3" />

          {/* Base waterline / street baseline */}
          <rect x="0" y="156" width="1200" height="4" />
        </g>
      </svg>
    </div>
  );
};
