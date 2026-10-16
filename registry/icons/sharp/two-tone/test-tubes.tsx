import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TestTubes({ size = 24, ...props }: IconProps) {
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
      <path d="M3 1L9 1C9.5523 1 10 1.4477 10 2L10 19C10 21.2091 8.2091 23 6 23C3.7909 23 2 21.2091 2 19L2 2C2 1.4477 2.4477 1 3 1ZM15 1L21 1C21.5523 1 22 1.4477 22 2L22 19C22 21.2091 20.2091 23 18 23C15.7909 23 14 21.2091 14 19L14 2C14 1.4477 14.4477 1 15 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 2L9 2L9 19C9 20.6569 7.6569 22 6 22C4.3431 22 3 20.6569 3 19L3 2ZM1 2L11 2M3 13L9 13M15 2L21 2L21 19C21 20.6569 19.6569 22 18 22C16.3431 22 15 20.6569 15 19L15 2ZM13 2L23 2M15 16L21 16" fill="none"/>
    </svg>
  )
}
