import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bed({ size = 24, ...props }: IconProps) {
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
      <path d="M1 17L1 9L5 9L5 5C5 4.4477 5.4477 4 6 4L12 4C12.5523 4 13 4.4477 13 5L13 9L22 9C22.5523 9 23 9.4477 23 10L23 17L1 17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1 17L1 9L22 9C22.5523 9 23 9.4477 23 10L23 17Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 3L2 21M22 16L22 21"/>
    </svg>
  )
}
