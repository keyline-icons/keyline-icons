import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Connections({ size = 24, ...props }: IconProps) {
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
      <path d="M11 17.5C11 19.9853 8.9853 22 6.5 22C4.0147 22 2 19.9853 2 17.5C2 15.0147 4.0147 13 6.5 13C8.9853 13 11 15.0147 11 17.5ZM22 6.5C22 8.9853 19.9853 11 17.5 11C15.0147 11 13 8.9853 13 6.5C13 4.0147 15.0147 2 17.5 2C19.9853 2 22 4.0147 22 6.5ZM10 5.5C10 7.9853 7.9853 10 5.5 10C3.0147 10 1 7.9853 1 5.5C1 3.0147 3.0147 1 5.5 1C7.9853 1 10 3.0147 10 5.5ZM23 18.5C23 20.9853 20.9853 23 18.5 23C16.0147 23 14 20.9853 14 18.5C14 16.0147 16.0147 14 18.5 14C20.9853 14 23 16.0147 23 18.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M8.9749 15.0251L15.0251 8.9749" fill="none"/>
    </svg>
  )
}
