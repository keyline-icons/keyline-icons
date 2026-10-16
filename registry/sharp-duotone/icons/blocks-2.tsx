import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Blocks2({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M1 14C1 13.4477 1.4477 13 2 13L10 13C10.5523 13 11 13.4477 11 14L11 22C11 22.5523 10.5523 23 10 23L2 23C1.4477 23 1 22.5523 1 22L1 14ZM13 14C13 13.4477 13.4477 13 14 13L22 13C22.5523 13 23 13.4477 23 14L23 22C23 22.5523 22.5523 23 22 23L14 23C13.4477 23 13 22.5523 13 22L13 14Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M7 2C7 1.4477 7.4477 1 8 1L16 1C16.5523 1 17 1.4477 17 2L17 10C17 10.5523 16.5523 11 16 11L8 11C7.4477 11 7 10.5523 7 10L7 2Z" fill="currentColor"/>
    </svg>
  )
}
