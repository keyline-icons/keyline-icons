import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Store({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M1 7.5L1 6C1 5.7661 1.082 5.5395 1.2318 5.3598L3.7318 2.3598C3.9218 2.1318 4.2032 2 4.5 2L19.5 2C19.7968 2 20.0782 2.1318 20.2682 2.3598L22.7682 5.3598C22.918 5.5395 23 5.7661 23 6L23 7.5C23 8.8519 22.2214 10.0829 21 10.6623L21 21C21 21.5523 20.5523 22 20 22L4 22C3.4477 22 3 21.5523 3 21L3 10.6623C1.7786 10.0829 1 8.8519 1 7.5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M19.5 10C18.1193 10 17 8.8807 17 7.5C17 8.8807 15.8807 10 14.5 10C13.1193 10 12 8.8807 12 7.5C12 8.8807 10.8807 10 9.5 10C8.1193 10 7 8.8807 7 7.5C7 8.8807 5.8807 10 4.5 10M9 22L9 14L15 14L15 22M7 7.5L7 6M12 7.5L12 6M17 7.5L17 6"/>
    </svg>
  )
}
