import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Webhook({ size = 24, ...props }: IconProps) {
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
      <path d="M16 5C16 7.2091 14.2091 9 12 9C9.7909 9 8 7.2091 8 5C8 2.7909 9.7909 1 12 1C14.2091 1 16 2.7909 16 5ZM23 19C23 21.2091 21.2091 23 19 23C16.7909 23 15 21.2091 15 19C15 16.7909 16.7909 15 19 15C21.2091 15 23 16.7909 23 19ZM9 19C9 21.2091 7.2091 23 5 23C2.7909 23 1 21.2091 1 19C1 16.7909 2.7909 15 5 15C7.2091 15 9 16.7909 9 19Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M13.3416 7.6833L16.1459 13.2918M16 19L11 19M6.3416 16.3167L9.1459 10.7082" fill="none"/>
    </svg>
  )
}
