import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PilcrowRight({ size = 24, ...props }: IconProps) {
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
      <path d="M15 3L6 3C4.3431 3 3 4.3431 3 6C3 7.6569 4.3431 9 6 9L8 9M8 3L8 14M13 3L13 14M2 17L21 17M16.7071 12.7071L21 17L16.7071 21.2929" fill="none"/>
    </svg>
  )
}
