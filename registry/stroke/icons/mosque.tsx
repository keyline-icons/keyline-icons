import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Mosque({ size = 24, ...props }: IconProps) {
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
      <path d="M17 22V7.17C17 7.06 17.0199 6.94 17.0589 6.84L18.5589 2.66C18.7016 2.26 19.0781 2 19.5 2C19.9219 2 20.2984 2.26 20.4411 2.66L21.9411 6.84C21.9801 6.94 22 7.06 22 7.17V20C22 21.1 21.1046 22 20 22H17ZM17 22H4C2.8954 22 2 21.1 2 20V16C2 14.9 2.8954 14 4 14H17M5 14C3.741 13.06 3 11.57 3 10C3 8.43 3.7409 6.94 4.9999 6L7.4 4.2C7.5731 4.07 7.7836 4 8 4C8.2164 4 8.4269 4.07 8.6 4.2L11.0001 6C12.2591 6.94 13 8.43 13 10C13 11.57 12.259 13.06 11 14M6 22V19C6 17.9 6.8954 17 8 17C9.1046 17 10 17.9 10 19V22"/>
    </svg>
  )
}
