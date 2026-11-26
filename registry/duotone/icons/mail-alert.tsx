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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5 3H19C21.2091 3 23 4.791 23 7V10C23 10.552 22.5523 11 22 11H16C14.3431 11 13 12.343 13 14V20C13 20.552 12.5523 21 12 21H5C2.7909 21 1 19.209 1 17V7C1 4.791 2.7909 3 5 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 7L11.2929 11C11.7154 11.282 12.2846 11.282 12.7071 11L22 7M19 14V16"/>
      <path d="M20 20C20 20.552 19.5523 21 19 21C18.4477 21 18 20.552 18 20C18 19.448 18.4477 19 19 19C19.5523 19 20 19.448 20 20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
