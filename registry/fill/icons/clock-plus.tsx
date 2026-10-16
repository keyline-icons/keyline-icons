import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ClockPlus({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C18.0751 1 23 5.9249 23 12C23 12.5523 22.5523 13 22 13H16C14.3431 13 13 14.3431 13 16V22C13 22.5523 12.5523 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1ZM11 6V12C11 12.5523 11.4477 13 12 13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V6C13 5.4477 12.5523 5 12 5C11.4477 5 11 5.4477 11 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M19 16V22M16 19H22"/>
    </svg>
  )
}
