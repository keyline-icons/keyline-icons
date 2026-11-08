import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Images({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4 7V20H17V22H3C2.448 22 2 21.55 2 21V7H4Z" fill="currentColor"/>
      <path d="M21 2C21.552 2 22 2.45 22 3V17C22 17.55 21.552 18 21 18H7C6.448 18 6 17.55 6 17V3C6 2.45 6.448 2 7 2H21ZM11.665 9.19L8 12.57V16H20V11.85L17.977 9.99L14.864 12.14L11.665 9.19ZM11 6C10.448 6 10 6.45 10 7C10 7.55 10.448 8 11 8C11.552 8 12 7.55 12 7C12 6.45 11.552 6 11 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
