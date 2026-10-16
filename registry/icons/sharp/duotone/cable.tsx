import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cable({ size = 24, ...props }: IconProps) {
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
      <path d="M14 4L6 4C3.7909 4 2 5.7909 2 8C2 10.2091 3.7909 12 6 12L18 12C20.2091 12 22 13.7909 22 16C22 18.2091 20.2091 20 18 20L10 20" strokeOpacity="0.4"/>
      <path d="M14 1L20 1C20.5523 1 21 1.4477 21 2L21 6C21 6.5523 20.5523 7 20 7L14 7C13.4477 7 13 6.5523 13 6L13 2C13 1.4477 13.4477 1 14 1ZM4 17L10 17C10.5523 17 11 17.4477 11 18L11 22C11 22.5523 10.5523 23 10 23L4 23C3.4477 23 3 22.5523 3 22L3 18C3 17.4477 3.4477 17 4 17Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M20 4L23 4M4 20L1 20"/>
    </svg>
  )
}
