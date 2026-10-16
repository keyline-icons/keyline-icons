import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Unlock({ size = 24, ...props }: IconProps) {
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
      <path d="M16.5 10L16.5 6.5C16.5 4.0147 14.4853 2 12 2C9.5147 2 7.5 4.0147 7.5 6.5" strokeOpacity="0.4"/>
      <path d="M13.5 16C13.5 16.8284 12.8284 17.5 12 17.5C11.1716 17.5 10.5 16.8284 10.5 16C10.5 15.1716 11.1716 14.5 12 14.5C12.8284 14.5 13.5 15.1716 13.5 16Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M17 9C19.2091 9 21 10.7909 21 13V19C21 21.2091 19.2091 23 17 23H7C4.79086 23 3 21.2091 3 19V13C3 10.7909 4.79086 9 7 9H17ZM12 14.5C11.1716 14.5 10.5 15.1716 10.5 16C10.5 16.8284 11.1716 17.5 12 17.5C12.8284 17.5 13.5 16.8284 13.5 16C13.5 15.1716 12.8284 14.5 12 14.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
