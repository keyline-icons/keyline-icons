import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CornerInverted({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 3L14.0718 3C14.5689 3 14.9905 3.3651 15.0615 3.8571C15.4416 6.4901 17.5099 8.5584 20.1429 8.9385C20.6349 9.0095 21 9.4311 21 9.9282L21 21"/>
    </svg>
  )
}
