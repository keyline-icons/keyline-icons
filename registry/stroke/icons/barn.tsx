import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Barn({ size = 24, ...props }: IconProps) {
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
      <path d="M2 21L2 10.3508C2 10.1237 2.0773 9.9034 2.2191 9.7261L5.8683 5.1646C5.9551 5.0561 6.0637 4.9668 6.1869 4.9026L11.5378 2.1133C11.8274 1.9623 12.1726 1.9623 12.4622 2.1133L17.8131 4.9026C17.9363 4.9668 18.0449 5.0561 18.1317 5.1646L21.7809 9.7261C21.9227 9.9034 22 10.1237 22 10.3508L22 21C22 21.5523 21.5523 22 21 22L3 22C2.4477 22 2 21.5523 2 21ZM8 22L8 16.5C8 16.2239 8.2239 16 8.5 16L15.5 16C15.7761 16 16 16.2239 16 16.5L16 22M16 22L8.1464 16.1464M11 8L13 8C13.5523 8 14 8.4477 14 9L14 11C14 11.5523 13.5523 12 13 12L11 12C10.4477 12 10 11.5523 10 11L10 9C10 8.4477 10.4477 8 11 8Z" fill="none"/>
    </svg>
  )
}
