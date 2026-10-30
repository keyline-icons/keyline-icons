import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BottlePump({ size = 24, ...props }: IconProps) {
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
      <path d="M6 10L18 10C18.5523 10 19 10.4477 19 11L19 22C19 22.5523 18.5523 23 18 23L6 23C5.4477 23 5 22.5523 5 22L5 11C5 10.4477 5.4477 10 6 10Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 11L8 7C8 6.4477 8.4477 6 9 6L15 6C15.5523 6 16 6.4477 16 7L16 11C16 11.5523 15.5523 12 15 12L9 12C8.4477 12 8 11.5523 8 11Z" fill="currentColor" stroke="none"/>
      <path d="M12 2L12 7M8 2L13.1716 2C14.9826 2 16.7194 2.7194 18 4L18.2929 4.2929" fill="none"/>
    </svg>
  )
}
