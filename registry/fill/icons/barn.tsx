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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M1 21L1 10.3508C1 9.8967 1.1546 9.4561 1.4382 9.1014L5.0874 4.5399C5.2611 4.3228 5.4781 4.1443 5.7247 4.0158L11.0756 1.2265C11.361 1.0778 11.6781 1.0001 12 1.0001C12.3219 1.0001 12.639 1.0778 12.9244 1.2265L18.2753 4.0158C18.5219 4.1443 18.7389 4.3228 18.9126 4.5399L22.5619 9.1015C22.8455 9.4561 23 9.8967 23 10.3508L23 21C23 22.1046 22.1046 23 21 23L3 23C1.8954 23 1 22.1046 1 21ZM11 7C9.8954 7 9 7.8954 9 9L9 11C9 12.1046 9.8954 13 11 13L13 13C14.1046 13 15 12.1046 15 11L15 9C15 7.8954 14.1046 7 13 7L11 7ZM9.6233 16L16 20.7528L16 16.5C16 16.2239 15.7761 16 15.5 16L9.6233 16ZM12.985 21L8 17.2845L8 21L12.985 21Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
