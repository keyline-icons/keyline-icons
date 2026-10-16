import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ExpandDashedUpLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M18 14L18 3M21.2929 6.2929L18 3L14.7071 6.2929M14 18L3 18M6.2929 14.7071L3 18L6.2929 21.2929M3 12L3 8.6667M3 6.6667L3 3L6.6667 3M8.6667 3L12 3"/>
    </svg>
  )
}
