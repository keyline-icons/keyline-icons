import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Tablet({ size = 24, ...props }: IconProps) {
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
      <path d="M23 7V17C23 19.2091 21.2091 21 19 21H5C2.79086 21 1 19.2091 1 17V7C1 4.79086 2.79086 3 5 3H19C21.2091 3 23 4.79086 23 7ZM13.5 8.5C13.5 7.6716 12.8284 7 12 7C11.1716 7 10.5 7.6716 10.5 8.5C10.5 9.3284 11.1716 10 12 10C12.8284 10 13.5 9.3284 13.5 8.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
