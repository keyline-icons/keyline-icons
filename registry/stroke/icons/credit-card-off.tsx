import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CreditCardOff({ size = 24, ...props }: IconProps) {
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
      <path d="M2 9L9 9M14.6569 9L22 9M19.8715 19.8715C19.5957 19.9551 19.3031 20 19 20L5 20C3.3431 20 2 18.6569 2 17L2 7C2 5.6462 2.8967 4.5019 4.1285 4.1285M9.6569 4L19 4C20.6569 4 22 5.3431 22 7L22 16.3431M2 2L22 22"/>
    </svg>
  )
}
