import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareBarChart2HorizontalEnd({ size = 24, ...props }: IconProps) {
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
      <path d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM8 7C7.4477 7 7 7.4477 7 8C7 8.5523 7.4477 9 8 9L16 9C16.5523 9 17 8.5523 17 8C17 7.4477 16.5523 7 16 7ZM10.6667 11C10.1144 11 9.6667 11.4477 9.6667 12C9.6667 12.5523 10.1144 13 10.6667 13L16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11ZM13.3333 15C12.781 15 12.3333 15.4477 12.3333 16C12.3333 16.5523 12.781 17 13.3333 17L16 17C16.5523 17 17 16.5523 17 16C17 15.4477 16.5523 15 16 15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
