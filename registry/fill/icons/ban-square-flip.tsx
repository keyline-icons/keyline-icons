import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BanSquareFlip({ size = 24, ...props }: IconProps) {
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
      <path d="M22 6C22 3.7909 20.2091 2 18 2L6 2C3.7909 2 2 3.7909 2 6L2 18C2 20.2091 3.7909 22 6 22L18 22C20.2091 22 22 20.2091 22 18L22 6ZM18 4.5858C18.1875 4.3983 18.4419 4.2929 18.7071 4.2929C19.2594 4.2929 19.7071 4.7406 19.7071 5.2929C19.7071 5.5581 19.6017 5.8125 19.4142 6L6 19.4142C5.8125 19.6017 5.5581 19.7071 5.2929 19.7071C4.7406 19.7071 4.2929 19.2594 4.2929 18.7071C4.2929 18.4419 4.3983 18.1875 4.5858 18L18 4.5858Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
