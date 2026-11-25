import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Scroll({ size = 24, ...props }: IconProps) {
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
      <path d="M18 16V6C18 4.3431 16.6569 3 15 3H4.5M18 16H20.5C21.3284 16 22 16.6716 22 17.5V18C22 19.6569 20.6569 21 19 21H9.5M18 16H14C12.8954 16 12 16.8954 12 18V18.5C12 19.8807 10.8807 21 9.5 21M7 9V15V18V18.5C7 19.8807 8.11929 21 9.5 21M7 9H3.5C2.67157 9 2 8.32843 2 7.5V5.5C2 4.11929 3.11929 3 4.5 3M7 9V5.5C7 4.11929 5.88071 3 4.5 3M11 8H14M11 12H14"/>
    </svg>
  )
}
