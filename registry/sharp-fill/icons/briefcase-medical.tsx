import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BriefcaseMedical({ size = 24, ...props }: IconProps) {
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
      <path d="M2 5.5L22 5.5C22.5523 5.5 23 5.9477 23 6.5L23 21C23 21.5523 22.5523 22 22 22L2 22C1.4477 22 1 21.5523 1 21L1 6.5C1 5.9477 1.4477 5.5 2 5.5ZM10.5 10L10.5 12.5L8 12.5L8 15.5L10.5 15.5L10.5 18L13.5 18L13.5 15.5L16 15.5L16 12.5L13.5 12.5L13.5 10L10.5 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M8.25 6.5L8.25 3L15.75 3L15.75 6.5" fill="none"/>
    </svg>
  )
}
