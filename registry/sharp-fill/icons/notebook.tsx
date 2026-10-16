import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Notebook({ size = 24, ...props }: IconProps) {
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
      <path d="M5 1L21 1C21.5523 1 22 1.4477 22 2L22 22C22 22.5523 21.5523 23 21 23L5 23C4.4477 23 4 22.5523 4 22L4 2C4 1.4477 4.4477 1 5 1ZM18 5L16 5L16 19L18 19L18 5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 7L8 7M2 12L8 12M2 17L8 17" fill="none"/>
    </svg>
  )
}
