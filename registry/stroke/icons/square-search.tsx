import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareSearch({ size = 24, ...props }: IconProps) {
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
      <path d="M6 3H18C19.6569 3 21 4.3432 21 6V18C21 19.6569 19.6569 21 18 21H6C4.3431 21 3 19.6569 3 18V6C3 4.3432 4.3431 3 6 3Z"/>
      <path d="M13.4141 13.4142L16.2425 16.2426M14.3569 11.0572C14.3569 12.8796 12.8795 14.357 11.0571 14.357C9.2346 14.357 7.7573 12.8796 7.7573 11.0572C7.7573 9.2347 9.2346 7.7574 11.0571 7.7574C12.8795 7.7574 14.3569 9.2347 14.3569 11.0572Z"/>
    </svg>
  )
}
