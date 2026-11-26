import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BotFrown({ size = 24, ...props }: IconProps) {
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
      <path d="M12 8V3.5M1 14.5H4M23 14.5H20M8.707 17.293L9 17C10 16 11 15.5 12 15.5C13 15.5 14 16 15 17L15.293 17.293M4 8H20V21H4V8Z"/>
      <path d="M13.5 3.5C13.5 4.328 12.828 5 12 5C11.172 5 10.5 4.328 10.5 3.5C10.5 2.672 11.172 2 12 2C12.828 2 13.5 2.672 13.5 3.5ZM10 12C10 12.552 9.552 13 9 13C8.448 13 8 12.552 8 12C8 11.448 8.448 11 9 11C9.552 11 10 11.448 10 12ZM16 12C16 12.552 15.552 13 15 13C14.448 13 14 12.552 14 12C14 11.448 14.448 11 15 11C15.552 11 16 11.448 16 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
