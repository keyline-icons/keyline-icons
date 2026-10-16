import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Thermometer({ size = 24, ...props }: IconProps) {
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
      <path d="M16.1716 2.1716C16.9217 1.4214 17.9391 1 19 1C21.2091 1 23 2.7909 23 5C23 6.0609 22.5786 7.0783 21.8284 7.8284L10.4852 19.1716C9.7351 19.9218 8.7177 20.3432 7.6568 20.3432C5.4477 20.3432 3.6568 18.5523 3.6568 16.3432C3.6568 15.2823 4.0782 14.2649 4.8284 13.5148L16.1716 2.1716ZM17.5858 3.5858L16.1716 5L16.8787 5.7071C17.0662 5.8946 17.3206 6 17.5858 6C18.1381 6 18.5858 5.5523 18.5858 5C18.5858 4.7348 18.4804 4.4804 18.2929 4.2929L17.5858 3.5858ZM14.7574 6.4142L13.3431 7.8284L14.0503 8.5355C14.2378 8.7231 14.4921 8.8284 14.7574 8.8284C15.3096 8.8284 15.7574 8.3807 15.7574 7.8284C15.7574 7.5632 15.652 7.3089 15.4645 7.1213L14.7574 6.4142ZM11.9289 9.2426L10.5147 10.6569L11.2218 11.364C11.4094 11.5515 11.6637 11.6569 11.9289 11.6569C12.4812 11.6569 12.9289 11.2091 12.9289 10.6569C12.9289 10.3916 12.8236 10.1373 12.636 9.9497L11.9289 9.2426Z" fill="currentColor" stroke="none"/>
      <path d="M5.5355 18.4645L2 22" fill="none"/>
    </svg>
  )
}
