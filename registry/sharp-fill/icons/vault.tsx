import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Vault({ size = 24, ...props }: IconProps) {
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
      <path d="M6 11L6 13L4 13L4 15L6 15L6 17C6 17.5523 6.4477 18 7 18L17 18C17.5523 18 18 17.5523 18 17L18 7C18 6.4477 17.5523 6 17 6L7 6C6.4477 6 6 6.4477 6 7L6 9L4 9L4 11L6 11ZM3 2L21 2C21.5523 2 22 2.4477 22 3L22 21C22 21.5523 21.5523 22 21 22L3 22C2.4477 22 2 21.5523 2 21L2 3C2 2.4477 2.4477 2 3 2ZM8 8L16 8L16 16L8 16L8 8ZM14 10L12 10L12 14L14 14L14 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
