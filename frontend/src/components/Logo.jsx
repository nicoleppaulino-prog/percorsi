/** Il segno di Percorsi: un sentiero che sale, con una tappa in fondo. */
export default function Logo({ size = 30 }) {
  return (
    <svg
      className="pc-logo"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 27 C5 17 16 22 16 15 S27 14 27 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <circle cx="27" cy="5" r="3.4" fill="var(--pc-ramp-4)" />
    </svg>
  )
}
