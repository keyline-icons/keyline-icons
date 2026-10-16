import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BedDouble({ size = 24, ...props }: IconProps) {
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
      <path d="M1 18L1 13C1 11.3431 2.3431 10 4 10L4 6C4 4.3431 5.3431 3 7 3L17 3C18.6569 3 20 4.3431 20 6L20 10C21.6569 10 23 11.3431 23 13L23 18C23 19.6569 21.6569 21 20 21L4 21C2.3431 21 1 19.6569 1 18Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 11L20 11C21.1046 11 22 11.8954 22 13L22 18C22 19.1046 21.1046 20 20 20L4 20C2.8954 20 2 19.1046 2 18L2 13C2 11.8954 2.8954 11 4 11ZM5 11L5 6C5 4.8954 5.8954 4 7 4L17 4C18.1046 4 19 4.8954 19 6L19 11M2 15L22 15M12 11L12 15" fill="none"/>
    </svg>
  )
}
