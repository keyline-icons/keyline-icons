import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function IvBag({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1H16C18.209 1 20 2.7908 20 5V12C20 14.7614 17.761 17 15 17H9C6.239 17 4 14.7614 4 12V5C4 2.7908 5.791 1 8 1H12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 11H19M12 16V19C12 20.6569 10.657 22 9 22H7M8 2H16C17.657 2 19 3.3431 19 5V12C19 14.2091 17.209 16 15 16H9C6.791 16 5 14.2091 5 12V5C5 3.3431 6.343 2 8 2Z"/>
      <path d="M13.5 6.5C13.5 7.3284 12.828 8 12 8C11.172 8 10.5 7.3284 10.5 6.5C10.5 5.6716 11.172 5 12 5C12.828 5 13.5 5.6716 13.5 6.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
