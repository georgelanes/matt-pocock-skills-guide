import { motion } from 'motion/react';
import type { SkillIconKey } from '../data/skills';

interface SkillIconProps {
  iconKey: SkillIconKey;
  active: boolean;
  size?: number;
  className?: string;
}

const SPRING_SNAPPY = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 26,
};

const EASE_OUT = {
  duration: 0.24,
  ease: [0.16, 1, 0.3, 1] as const,
};

export function SkillIcon({
  iconKey,
  active,
  size = 24,
  className = '',
}: SkillIconProps) {
  const baseStroke = active ? '#F4F4F6' : '#A1A4B0';
  const accentStroke = active ? '#F59E0B' : '#717584';

  const svgProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    strokeWidth: 1.65,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: `shrink-0 overflow-visible ${className}`,
    'aria-hidden': true,
  };

  switch (iconKey) {
    case 'grill-me':
      // Decision tree branches expand & illuminate outward on hover
      return (
        <svg {...svgProps}>
          <motion.circle
            cx="12"
            cy="5"
            r="2.2"
            animate={{
              stroke: accentStroke,
              scale: active ? 1.15 : 1,
            }}
            transition={SPRING_SNAPPY}
            style={{ transformOrigin: '12px 5px' }}
          />
          <motion.path
            d="M12 7.2V11.5"
            animate={{ stroke: baseStroke }}
            transition={EASE_OUT}
          />
          <motion.path
            d="M12 11.5L6.5 16.2"
            animate={{
              stroke: active ? '#F59E0B' : '#A1A4B0',
              pathLength: active ? [0.4, 1] : 1,
            }}
            transition={EASE_OUT}
          />
          <motion.path
            d="M12 11.5L17.5 16.2"
            animate={{
              stroke: active ? '#F59E0B' : '#A1A4B0',
              pathLength: active ? [0.4, 1] : 1,
            }}
            transition={{ ...EASE_OUT, delay: active ? 0.05 : 0 }}
          />
          <motion.circle
            cx="5.5"
            cy="18.2"
            r="2"
            animate={{
              stroke: baseStroke,
              y: active ? 0.8 : 0,
              x: active ? -0.6 : 0,
            }}
            transition={SPRING_SNAPPY}
          />
          <motion.circle
            cx="18.5"
            cy="18.2"
            r="2"
            animate={{
              stroke: baseStroke,
              y: active ? 0.8 : 0,
              x: active ? 0.6 : 0,
            }}
            transition={SPRING_SNAPPY}
          />
        </svg>
      );

    case 'to-spec':
      // Structured document lines draw smoothly with pathLength
      return (
        <svg {...svgProps}>
          <motion.rect
            x="4.5"
            y="3"
            width="15"
            height="18"
            rx="2.5"
            animate={{ stroke: baseStroke }}
            transition={EASE_OUT}
          />
          <motion.path
            d="M8.5 8H15.5"
            animate={{
              stroke: accentStroke,
              pathLength: active ? [0.25, 1] : 1,
            }}
            transition={EASE_OUT}
          />
          <motion.path
            d="M8.5 12H15.5"
            animate={{
              stroke: baseStroke,
              pathLength: active ? [0.25, 1] : 1,
            }}
            transition={{ ...EASE_OUT, delay: active ? 0.05 : 0 }}
          />
          <motion.path
            d="M8.5 16H12.5"
            animate={{
              stroke: baseStroke,
              pathLength: active ? [0.25, 1] : 1,
            }}
            transition={{ ...EASE_OUT, delay: active ? 0.1 : 0 }}
          />
        </svg>
      );

    case 'to-tickets':
      // Stacked task cards fan out vertically on hover
      return (
        <svg {...svgProps}>
          <motion.rect
            x="4"
            y="4"
            width="16"
            height="5"
            rx="1.5"
            animate={{
              stroke: accentStroke,
              y: active ? -1.2 : 0,
            }}
            transition={SPRING_SNAPPY}
          />
          <motion.rect
            x="4"
            y="9.5"
            width="16"
            height="5"
            rx="1.5"
            animate={{
              stroke: baseStroke,
              x: active ? 1.2 : 0,
            }}
            transition={SPRING_SNAPPY}
          />
          <motion.rect
            x="4"
            y="15"
            width="16"
            height="5"
            rx="1.5"
            animate={{
              stroke: baseStroke,
              y: active ? 1.2 : 0,
            }}
            transition={SPRING_SNAPPY}
          />
        </svg>
      );

    case 'implement':
      // Code brackets part slightly and center slash/cursor snaps in
      return (
        <svg {...svgProps}>
          <motion.path
            d="M8.5 7.5L4 12L8.5 16.5"
            animate={{
              stroke: baseStroke,
              x: active ? -1.5 : 0,
            }}
            transition={SPRING_SNAPPY}
          />
          <motion.path
            d="M15.5 7.5L20 12L15.5 16.5"
            animate={{
              stroke: baseStroke,
              x: active ? 1.5 : 0,
            }}
            transition={SPRING_SNAPPY}
          />
          <motion.path
            d="M13.5 5.5L10.5 18.5"
            animate={{
              stroke: accentStroke,
              scaleY: active ? 1.08 : 1,
            }}
            transition={SPRING_SNAPPY}
            style={{ transformOrigin: '12px 12px' }}
          />
        </svg>
      );

    case 'code-review':
      // Dual-axis inspection frame & checkmark sweep
      return (
        <svg {...svgProps}>
          <motion.circle
            cx="11"
            cy="11"
            r="6.5"
            animate={{
              stroke: baseStroke,
              scale: active ? 1.05 : 1,
            }}
            transition={SPRING_SNAPPY}
            style={{ transformOrigin: '11px 11px' }}
          />
          <motion.path
            d="M16 16L20.5 20.5"
            animate={{
              stroke: baseStroke,
              x: active ? 0.6 : 0,
              y: active ? 0.6 : 0,
            }}
            transition={SPRING_SNAPPY}
          />
          <motion.path
            d="M8.2 11.2L10.2 13.2L14 9.2"
            animate={{
              stroke: accentStroke,
              pathLength: active ? [0.2, 1] : 1,
            }}
            transition={EASE_OUT}
          />
        </svg>
      );

    case 'pr':
      // Git branches converge into merged main line
      return (
        <svg {...svgProps}>
          <motion.circle cx="7" cy="6" r="2" animate={{ stroke: baseStroke }} transition={EASE_OUT} />
          <motion.circle cx="7" cy="18" r="2" animate={{ stroke: baseStroke }} transition={EASE_OUT} />
          <motion.path d="M7 8V16" animate={{ stroke: baseStroke }} transition={EASE_OUT} />
          <motion.circle
            cx="17"
            cy="18"
            r="2"
            animate={{
              stroke: accentStroke,
              scale: active ? 1.15 : 1,
            }}
            transition={SPRING_SNAPPY}
            style={{ transformOrigin: '17px 18px' }}
          />
          <motion.path
            d="M17 16V11.5C17 9.5 15.5 8 13.5 8H11"
            animate={{
              stroke: accentStroke,
              pathLength: active ? [0.3, 1] : 1,
            }}
            transition={EASE_OUT}
          />
          <motion.path
            d="M13 6L11 8L13 10"
            animate={{
              stroke: accentStroke,
              x: active ? -0.8 : 0,
            }}
            transition={SPRING_SNAPPY}
          />
        </svg>
      );

    case 'ask-matt':
      // Compass needle rotates smoothly to align with target bearing
      return (
        <svg {...svgProps}>
          <motion.circle cx="12" cy="12" r="8.5" animate={{ stroke: baseStroke }} transition={EASE_OUT} />
          <motion.polygon
            points="15.8,8.2 13.6,13.6 8.2,15.8 10.4,10.4"
            animate={{
              stroke: accentStroke,
              rotate: active ? 32 : 0,
            }}
            transition={SPRING_SNAPPY}
            style={{ transformOrigin: '12px 12px' }}
          />
        </svg>
      );

    case 'setup-skills':
      // Calibration sliders shift into tuned positions
      return (
        <svg {...svgProps}>
          <motion.path d="M4 7H20" animate={{ stroke: baseStroke }} transition={EASE_OUT} />
          <motion.path d="M4 12H20" animate={{ stroke: baseStroke }} transition={EASE_OUT} />
          <motion.path d="M4 17H20" animate={{ stroke: baseStroke }} transition={EASE_OUT} />
          <motion.circle
            cx="9"
            cy="7"
            r="2"
            fill="#0A0A0D"
            animate={{ stroke: accentStroke, x: active ? 4 : 0 }}
            transition={SPRING_SNAPPY}
          />
          <motion.circle
            cx="15"
            cy="12"
            r="2"
            fill="#0A0A0D"
            animate={{ stroke: accentStroke, x: active ? -5 : 0 }}
            transition={SPRING_SNAPPY}
          />
          <motion.circle
            cx="10"
            cy="17"
            r="2"
            fill="#0A0A0D"
            animate={{ stroke: baseStroke, x: active ? 3 : 0 }}
            transition={SPRING_SNAPPY}
          />
        </svg>
      );

    case 'tdd':
      // Red-Green-Refactor cycle rotates cleanly by 120deg
      return (
        <svg {...svgProps}>
          <motion.g
            animate={{ rotate: active ? 120 : 0 }}
            transition={SPRING_SNAPPY}
            style={{ transformOrigin: '12px 12px' }}
          >
            <motion.path
              d="M12 3.5A8.5 8.5 0 0 1 19.8 8.8"
              animate={{ stroke: active ? '#EF4444' : '#A1A4B0' }}
              transition={EASE_OUT}
            />
            <motion.path
              d="M19.8 14.8A8.5 8.5 0 0 1 8.4 19.7"
              animate={{ stroke: active ? '#22C55E' : '#A1A4B0' }}
              transition={EASE_OUT}
            />
            <motion.path
              d="M5.2 17A8.5 8.5 0 0 1 8.8 4.1"
              animate={{ stroke: accentStroke }}
              transition={EASE_OUT}
            />
          </motion.g>
          <motion.path
            d="M9.5 12.2L11.2 13.9L14.8 10.3"
            animate={{ stroke: accentStroke, scale: active ? 1.1 : 1 }}
            transition={SPRING_SNAPPY}
            style={{ transformOrigin: '12px 12px' }}
          />
        </svg>
      );

    case 'diagnose':
      // Targeting reticle contracts to lock onto root cause
      return (
        <svg {...svgProps}>
          <motion.circle
            cx="12"
            cy="12"
            r="7.5"
            animate={{ stroke: baseStroke, scale: active ? 0.92 : 1 }}
            transition={SPRING_SNAPPY}
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="2.2"
            animate={{ stroke: accentStroke, scale: active ? 1.25 : 1 }}
            transition={SPRING_SNAPPY}
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.path d="M12 2.5V6" animate={{ stroke: baseStroke, y: active ? 1.2 : 0 }} transition={SPRING_SNAPPY} />
          <motion.path d="M12 18V21.5" animate={{ stroke: baseStroke, y: active ? -1.2 : 0 }} transition={SPRING_SNAPPY} />
          <motion.path d="M2.5 12H6" animate={{ stroke: baseStroke, x: active ? 1.2 : 0 }} transition={SPRING_SNAPPY} />
          <motion.path d="M18 12H21.5" animate={{ stroke: baseStroke, x: active ? -1.2 : 0 }} transition={SPRING_SNAPPY} />
        </svg>
      );

    case 'architecture':
      // Shallow layers align into cohesive deep architectural modules
      return (
        <svg {...svgProps}>
          <motion.path
            d="M12 3.5L20 7.5L12 11.5L4 7.5L12 3.5Z"
            animate={{ stroke: accentStroke, y: active ? -1.2 : 0 }}
            transition={SPRING_SNAPPY}
          />
          <motion.path
            d="M4 12L12 16L20 12"
            animate={{ stroke: baseStroke }}
            transition={EASE_OUT}
          />
          <motion.path
            d="M4 16.5L12 20.5L20 16.5"
            animate={{ stroke: baseStroke, y: active ? 1.2 : 0 }}
            transition={SPRING_SNAPPY}
          />
        </svg>
      );

    case 'triage':
      // Funnel streams converge cleanly into prioritized output
      return (
        <svg {...svgProps}>
          <motion.path
            d="M4 5H20L14 12.2V18.5L10 20V12.2L4 5Z"
            animate={{ stroke: baseStroke }}
            transition={EASE_OUT}
          />
          <motion.path
            d="M8.5 8.5H15.5"
            animate={{ stroke: accentStroke, scaleX: active ? 1.12 : 0.9 }}
            transition={SPRING_SNAPPY}
            style={{ transformOrigin: '12px 8.5px' }}
          />
        </svg>
      );

    case 'wayfinder':
      // Route waypoints illuminate along path
      return (
        <svg {...svgProps}>
          <motion.circle cx="6" cy="18" r="2" animate={{ stroke: baseStroke }} transition={EASE_OUT} />
          <motion.circle
            cx="18"
            cy="6"
            r="2"
            animate={{ stroke: accentStroke, scale: active ? 1.2 : 1 }}
            transition={SPRING_SNAPPY}
            style={{ transformOrigin: '18px 6px' }}
          />
          <motion.path
            d="M8 18H13.5C15.2 18 16.5 16.7 16.5 15V13C16.5 11.3 15.2 10 13.5 10H10.5C8.8 10 7.5 8.7 7.5 7V6H16"
            animate={{
              stroke: active ? '#F59E0B' : '#A1A4B0',
              pathLength: active ? [0.25, 1] : 1,
            }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      );

    case 'prototype':
      // Isometric cube wireframe shifts slightly to show exploration
      return (
        <svg {...svgProps}>
          <motion.path
            d="M12 3.2L19.5 7.5V16.5L12 20.8L4.5 16.5V7.5L12 3.2Z"
            animate={{ stroke: baseStroke }}
            transition={EASE_OUT}
          />
          <motion.path
            d="M12 12L19.5 7.5"
            animate={{ stroke: accentStroke }}
            transition={EASE_OUT}
          />
          <motion.path
            d="M12 12L4.5 7.5"
            animate={{ stroke: accentStroke }}
            transition={EASE_OUT}
          />
          <motion.path
            d="M12 12V20.8"
            animate={{ stroke: accentStroke, y: active ? 0.6 : 0 }}
            transition={SPRING_SNAPPY}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="1.4"
            fill="#F59E0B"
            stroke="none"
            animate={{ scale: active ? 1.35 : 0.85, opacity: active ? 1 : 0.55 }}
            transition={SPRING_SNAPPY}
            style={{ transformOrigin: '12px 12px' }}
          />
        </svg>
      );

    case 'zoom-out':
      // Four corner frame brackets expand outward to reveal full picture
      return (
        <svg {...svgProps}>
          <motion.path
            d="M8.5 4.5H4.5V8.5"
            animate={{ stroke: accentStroke, x: active ? -1.4 : 0, y: active ? -1.4 : 0 }}
            transition={SPRING_SNAPPY}
          />
          <motion.path
            d="M15.5 4.5H19.5V8.5"
            animate={{ stroke: accentStroke, x: active ? 1.4 : 0, y: active ? -1.4 : 0 }}
            transition={SPRING_SNAPPY}
          />
          <motion.path
            d="M8.5 19.5H4.5V15.5"
            animate={{ stroke: accentStroke, x: active ? -1.4 : 0, y: active ? 1.4 : 0 }}
            transition={SPRING_SNAPPY}
          />
          <motion.path
            d="M15.5 19.5H19.5V15.5"
            animate={{ stroke: accentStroke, x: active ? 1.4 : 0, y: active ? 1.4 : 0 }}
            transition={SPRING_SNAPPY}
          />
          <motion.rect
            x="9.5"
            y="9.5"
            width="5"
            height="5"
            rx="1"
            animate={{ stroke: baseStroke, scale: active ? 0.86 : 1 }}
            transition={SPRING_SNAPPY}
            style={{ transformOrigin: '12px 12px' }}
          />
        </svg>
      );

    case 'handoff':
      // Relay baton arrow glides smoothly across session boundary
      return (
        <svg {...svgProps}>
          <motion.rect
            x="3.5"
            y="5.5"
            width="6.5"
            height="13"
            rx="1.8"
            animate={{ stroke: baseStroke }}
            transition={EASE_OUT}
          />
          <motion.rect
            x="14"
            y="5.5"
            width="6.5"
            height="13"
            rx="1.8"
            animate={{ stroke: active ? '#F59E0B' : '#A1A4B0' }}
            transition={EASE_OUT}
          />
          <motion.path
            d="M8.5 12H15.5"
            animate={{ stroke: accentStroke, x: active ? 1.4 : 0 }}
            transition={SPRING_SNAPPY}
          />
          <motion.path
            d="M13.2 9.5L15.7 12L13.2 14.5"
            animate={{ stroke: accentStroke, x: active ? 1.4 : 0 }}
            transition={SPRING_SNAPPY}
          />
        </svg>
      );

    case 'write-a-skill':
      // Pen nib strokes a crisp markdown blueprint line
      return (
        <svg {...svgProps}>
          <motion.path
            d="M15.5 4.5L19.5 8.5L9.5 18.5H5.5V14.5L15.5 4.5Z"
            animate={{
              stroke: baseStroke,
              x: active ? 0.9 : 0,
              y: active ? -0.9 : 0,
            }}
            transition={SPRING_SNAPPY}
          />
          <motion.path
            d="M4.5 21H19.5"
            animate={{
              stroke: accentStroke,
              pathLength: active ? [0.25, 1] : 1,
            }}
            transition={EASE_OUT}
          />
        </svg>
      );

    case 'retro':
      // Counter-clockwise retrospective arc rotates subtly to reflect & improve
      return (
        <svg {...svgProps}>
          <motion.g
            animate={{ rotate: active ? -24 : 0 }}
            transition={SPRING_SNAPPY}
            style={{ transformOrigin: '12px 12px' }}
          >
            <motion.path
              d="M4.5 12A7.5 7.5 0 1 0 6.7 6.7"
              animate={{ stroke: baseStroke }}
              transition={EASE_OUT}
            />
            <motion.path
              d="M4.5 4.5V8.5H8.5"
              animate={{ stroke: accentStroke }}
              transition={EASE_OUT}
            />
          </motion.g>
          <motion.path
            d="M12 8.5V12.2L14.6 13.8"
            animate={{ stroke: accentStroke }}
            transition={EASE_OUT}
          />
        </svg>
      );
  }
}
