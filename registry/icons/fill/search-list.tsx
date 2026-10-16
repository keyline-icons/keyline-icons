import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SearchList({ size = 24, ...props }: IconProps) {
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
      <path d="M18 10C18 14.4183 14.4183 18 10 18C5.5817 18 2 14.4183 2 10C2 5.5817 5.5817 2 10 2C14.4183 2 18 5.5817 18 10ZM7.8 9L10.2 9C10.7523 9 11.2 8.5523 11.2 8C11.2 7.4477 10.7523 7 10.2 7L7.8 7C7.2477 7 6.8 7.4477 6.8 8C6.8 8.5523 7.2477 9 7.8 9ZM7.8 13L12.2 13C12.7523 13 13.2 12.5523 13.2 12C13.2 11.4477 12.7523 11 12.2 11L7.8 11C7.2477 11 6.8 11.4477 6.8 12C6.8 12.5523 7.2477 13 7.8 13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M15 15L21 21"/>
    </svg>
  )
}
