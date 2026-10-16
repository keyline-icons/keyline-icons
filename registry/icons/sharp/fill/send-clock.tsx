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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6.5744 11.0404L6.1382 10.7426L2 7.9174L22 2L20.7043 6.3794L20.4923 7.0957M18.2562 5.7438L18.5491 5.4509L22 2"/>
      <path d="M23 15.5C23 19.6421 19.6421 23 15.5 23C11.3579 23 8 19.6421 8 15.5C8 11.3579 11.3579 8 15.5 8C19.6421 8 23 11.3579 23 15.5ZM16.5 12L14.5 12L14.5 15.5C14.5 16.0523 14.9477 16.5 15.5 16.5L19 16.5L19 14.5L16.5 14.5L16.5 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
