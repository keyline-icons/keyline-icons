import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ListTodoCircle({ size = 24, ...props }: IconProps) {
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
      <path d="M9 7C9 9.2091 7.2091 11 5 11C2.7909 11 1 9.2091 1 7C1 4.7909 2.7909 3 5 3C7.2091 3 9 4.7909 9 7ZM9 17C9 19.2091 7.2091 21 5 21C2.7909 21 1 19.2091 1 17C1 14.7909 2.7909 13 5 13C7.2091 13 9 14.7909 9 17Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M11 7L23 7M11 17L23 17" fill="none" strokeOpacity="0.4"/>
      <path d="M8 7C8 8.6569 6.6569 10 5 10C3.3431 10 2 8.6569 2 7C2 5.3431 3.3431 4 5 4C6.6569 4 8 5.3431 8 7ZM8 17C8 18.6569 6.6569 20 5 20C3.3431 20 2 18.6569 2 17C2 15.3431 3.3431 14 5 14C6.6569 14 8 15.3431 8 17Z" fill="none"/>
    </svg>
  )
}
