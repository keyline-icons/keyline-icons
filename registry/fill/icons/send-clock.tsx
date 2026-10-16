import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SendClock({ size = 24, ...props }: IconProps) {
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
      <path d="M5.7022 11.7199L2.4363 9.4902C1.7402 9.015 1.9082 7.9446 2.7164 7.7054L22 2L20.7043 6.3794M18.5491 5.4509L22 2"/>
      <path d="M23 15.5C23 19.6421 19.6421 23 15.5 23C11.3579 23 8 19.6421 8 15.5C8 11.3579 11.3579 8 15.5 8C19.6421 8 23 11.3579 23 15.5ZM16.5 13C16.5 12.4477 16.0523 12 15.5 12C14.9477 12 14.5 12.4477 14.5 13L14.5 15.5C14.5 16.0523 14.9477 16.5 15.5 16.5L18 16.5C18.5523 16.5 19 16.0523 19 15.5C19 14.9477 18.5523 14.5 18 14.5L16.5 14.5L16.5 13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
