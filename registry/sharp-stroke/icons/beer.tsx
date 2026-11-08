import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Beer({ size = 24, ...props }: IconProps) {
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
      <path d="M5 9.828V22H17V18M5 9.828C3.801 9.405 3 8.271 3 7C3 5.343 4.343 4 6 4C6.742 4 7.458 4.275 8.009 4.772C8.128 3.208 9.432 2 11 2C12.568 2 13.872 3.208 13.991 4.772C14.542 4.275 15.258 4 16 4C17.657 4 19 5.343 19 7C19 8.271 18.199 9.405 17 9.828M5 9.828H17M17 18V12M17 18H18C19.657 18 21 16.657 21 15C21 13.343 19.657 12 18 12H17M17 9.828V12M9 13V19M13 13V19"/>
    </svg>
  )
}
