import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Skull({ size = 24, ...props }: IconProps) {
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
      <path d="M5.7 17.4273C3.9731 15.7346 3 13.4182 3 11C3 6.0294 7.0294 2 12 2C16.9706 2 21 6.0294 21 11C21 13.4182 20.0269 15.7346 18.3 17.4273C18.1081 17.6154 18 17.8727 18 18.1414L18 20C18 21.1046 17.1046 22 16 22L8 22C6.8954 22 6 21.1046 6 20L6 18.1414C6 17.8727 5.8919 17.6154 5.7 17.4273ZM10 22L10 20M14 22L14 20M10.75 16L12 14L13.25 16" fill="none"/>
      <path d="M10 11C10 11.8284 9.3284 12.5 8.5 12.5C7.6716 12.5 7 11.8284 7 11C7 10.1716 7.6716 9.5 8.5 9.5C9.3284 9.5 10 10.1716 10 11ZM17 11C17 11.8284 16.3284 12.5 15.5 12.5C14.6716 12.5 14 11.8284 14 11C14 10.1716 14.6716 9.5 15.5 9.5C16.3284 9.5 17 10.1716 17 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
