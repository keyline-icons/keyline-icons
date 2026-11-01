import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Couch({ size = 24, ...props }: IconProps) {
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
      <path d="M19 18L5 18M19 18L22 18L22 11L20 11M5 18L2 18L2 11L4 11M12 5L10 5C6.6863 5 4 7.6863 4 11M12 5L14 5C17.3137 5 20 7.6863 20 11M12 5L12 14M12 14L6 14L6 11L4 11M12 14L18 14L18 11L20 11M19 18L19 20M5 18L5 20" fill="none"/>
    </svg>
  )
}
