import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Search2Minus({ size = 24, ...props }: IconProps) {
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
      <path d="M20 11C20 15.9706 15.9706 20 11 20C6.0294 20 2 15.9706 2 11C2 6.0294 6.0294 2 11 2C15.9706 2 20 6.0294 20 11ZM7 12L15 12L15 10L7 10L7 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M16.2929 16.2929L21.2929 21.2929"/>
    </svg>
  )
}
