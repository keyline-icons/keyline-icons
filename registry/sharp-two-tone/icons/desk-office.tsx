import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DeskOffice({ size = 24, ...props }: IconProps) {
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
      <path d="M14 11L21 11C21.5523 11 22 11.4477 22 12L22 22C22 22.5523 21.5523 23 21 23L14 23C13.4477 23 13 22.5523 13 22L13 12C13 11.4477 13.4477 11 14 11ZM6 8L6 2C6 1.4477 6.4477 1 7 1L17 1C17.5523 1 18 1.4477 18 2L18 8C18 8.5523 17.5523 9 17 9L7 9C6.4477 9 6 8.5523 6 8Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M3 23L3 12L21 12L21 22L14 22L14 11M21 17L14 17M12 12L12 8M7 8L7 2L17 2L17 8L7 8Z" fill="none"/>
    </svg>
  )
}
