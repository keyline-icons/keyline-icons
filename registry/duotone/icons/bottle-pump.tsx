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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9 10L15 10C17.2092 10 19 11.7908 19 14L19 19C19 21.2092 17.2092 23 15 23L9 23C6.7908 23 5 21.2092 5 19L5 14C5 11.7908 6.7908 10 9 10Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 11L8 7.5C8 6.6716 8.6716 6 9.5 6L14.5 6C15.3284 6 16 6.6716 16 7.5L16 11C16 11.5523 15.5523 12 15 12L9 12C8.4477 12 8 11.5523 8 11Z" fill="currentColor" stroke="none"/>
      <path d="M12 2L12 7M9 2L13.1716 2C14.9826 2 16.7194 2.7194 18 4" fill="none"/>
    </svg>
  )
}
