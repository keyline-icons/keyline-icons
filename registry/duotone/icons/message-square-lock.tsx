import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSquareLock({ size = 24, ...props }: IconProps) {
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
      <path d="M6 2L18 2C20.2091 2 22 3.7909 22 6L22 8C22 8.5523 21.5523 9 21 9L14 9C12.3431 9 11 10.3431 11 12L11 17C11 17.5523 10.5523 18 10 18L7.4142 18L3.7071 21.7071C3.5196 21.8946 3.2652 22 3 22C2.4477 22 2 21.5523 2 21L2 6C2 3.7909 3.7909 2 6 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15 16L20 16C20.5523 16 21 16.4477 21 17L21 20C21 20.5523 20.5523 21 20 21L15 21C14.4477 21 14 20.5523 14 20L14 17C14 16.4477 14.4477 16 15 16ZM15.5 16L15.5 14C15.5 12.8954 16.3954 12 17.5 12C18.6046 12 19.5 12.8954 19.5 14L19.5 16"/>
    </svg>
  )
}
