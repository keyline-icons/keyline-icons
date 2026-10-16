import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Delete({ size = 24, ...props }: IconProps) {
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
      <path d="M1.5281 10.646L7.6698 3.969C8.2379 3.3514 9.0386 3 9.8778 3L19 3C21.2091 3 23 4.7909 23 7L23 17C23 19.2091 21.2091 21 19 21L9.8778 21C9.0386 21 8.2379 20.6486 7.6698 20.031L1.5281 13.354C1.1885 12.9848 1 12.5016 1 12C1 11.4984 1.1885 11.0152 1.5281 10.646Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11 9L17 15M17 9L11 15"/>
    </svg>
  )
}
