import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Whistle({ size = 24, ...props }: IconProps) {
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
      <path d="M14.6016 17.7116C13.1595 19.126 11.1808 20 9 20C6.7909 20 4.7909 19.1046 3.3431 17.6569C1.8954 16.2091 1 14.2091 1 12C1 9.7912 1.8964 7.7899 3.3431 6.3431C4.7899 4.8964 6.7912 4 9 4L13 4C13.5523 4 14 4.4477 14 5L14 8L16 8L16 5C16 4.4477 16.4477 4 17 4L22 4C22.5523 4 23 4.4477 23 5L23 9C23 9.4037 22.7572 9.7678 22.3846 9.9231L16.9983 12.1673C16.9537 14.3381 16.0435 16.2973 14.6016 17.7116ZM12.5 12C12.5 10.067 10.933 8.5 9 8.5C7.067 8.5 5.5 10.067 5.5 12C5.5 13.933 7.067 15.5 9 15.5C10.933 15.5 12.5 13.933 12.5 12ZM10.5 12C10.5 12.8284 9.8284 13.5 9 13.5C8.1716 13.5 7.5 12.8284 7.5 12C7.5 11.1716 8.1716 10.5 9 10.5C9.8284 10.5 10.5 11.1716 10.5 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
