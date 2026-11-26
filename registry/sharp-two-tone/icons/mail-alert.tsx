import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MailAlert({ size = 24, ...props }: IconProps) {
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
      <path d="M2 3H22C22.552 3 23 3.448 23 4V10C23 10.552 22.552 11 22 11H13V20C13 20.552 12.552 21 12 21H2C1.448 21 1 20.552 1 20V4C1 3.448 1.448 3 2 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M13 20H2V4H22V11M2 7L11.293 11C11.715 11.282 12.285 11.282 12.707 11L22 7M19 13V17"/>
      <path d="M20 20C20 20.552 19.552 21 19 21C18.448 21 18 20.552 18 20C18 19.448 18.448 19 19 19C19.552 19 20 19.448 20 20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
