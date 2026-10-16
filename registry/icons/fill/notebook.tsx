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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4 5C4 2.7909 5.7909 1 8 1L18 1C20.2091 1 22 2.7909 22 5L22 19C22 21.2091 20.2091 23 18 23L8 23C5.7909 23 4 21.2091 4 19L4 5ZM18 6C18 5.4477 17.5523 5 17 5C16.4477 5 16 5.4477 16 6L16 18C16 18.5523 16.4477 19 17 19C17.5523 19 18 18.5523 18 18L18 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M3 7L7 7M3 12L7 12M3 17L7 17" fill="none"/>
    </svg>
  )
}
