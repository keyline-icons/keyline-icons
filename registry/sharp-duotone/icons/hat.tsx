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
      <path d="M5.641 11.5853L6.7684 4.8353C6.8489 4.3532 7.266 4 7.7547 4L9.8571 4C10.0623 4 10.2625 4.0631 10.4306 4.1808L12 5.2794L13.5694 4.1808C13.7375 4.0631 13.9377 4 14.1429 4L16.2453 4C16.734 4 17.1511 4.3532 17.2316 4.8353L19.4863 18.3353L19.5288 18.5896C19.5379 18.6441 19.5425 18.6992 19.5425 18.7544C19.5425 19.3067 19.0948 19.7544 18.5425 19.7544L5.4575 19.7544C4.9052 19.7544 4.4575 19.3067 4.4575 18.7544C4.4575 18.6992 4.4621 18.6441 4.4712 18.5896L4.5137 18.3352Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 13L2 14C2 16.7614 4.2386 19 7 19L17 19C19.7614 19 22 16.7614 22 14L22 13"/>
      <path d="M5.5717 12L6.4206 12L6.5715 12L17.4285 12L17.5793 12L18.4282 12L18.7622 14L17.5793 14L17.4285 14L6.5715 14L6.4206 14L5.2377 14Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
