import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Hat({ size = 24, ...props }: IconProps) {
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
      <path d="M2 13L2 14C2 16.7614 4.2386 19 7 19L17 19C19.7614 19 22 16.7614 22 14L22 13M5.4575 18.7544L5.5 18.5L7.7547 5L9.8571 5L12 6.5001L14.1429 5L16.2453 5L18.5 18.5L18.5425 18.7544M6.4206 13L6.5715 13L17.4285 13L17.5793 13" fill="none"/>
    </svg>
  )
}
