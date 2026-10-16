import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SearchMinus({ size = 24, ...props }: IconProps) {
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
      <path d="M18 10C18 14.4183 14.4183 18 10 18C5.5817 18 2 14.4183 2 10C2 5.5817 5.5817 2 10 2C14.4183 2 18 5.5817 18 10ZM7 11L13 11C13.5523 11 14 10.5523 14 10C14 9.4477 13.5523 9 13 9L7 9C6.4477 9 6 9.4477 6 10C6 10.5523 6.4477 11 7 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M15 15L21 21"/>
    </svg>
  )
}
