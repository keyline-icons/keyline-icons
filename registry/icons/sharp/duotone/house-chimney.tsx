import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HouseChimney({ size = 24, ...props }: IconProps) {
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
      <path d="M11.3857 2.20711C11.7469 1.92603 12.253 1.92603 12.6142 2.20711L15 4.06257V3.00007C15 2.4478 15.4477 2.00009 16 2.00007H20C20.5522 2.00007 21 2.44779 21 3.00007V8.7325L23 10.2891L21.7714 11.8673L21 11.2667V21.0001C20.9998 21.5522 20.5521 22.0001 20 22.0001H3.99996C3.44781 22.0001 3.00014 21.5522 2.99996 21.0001V11.2667L2.22848 11.8673L0.999962 10.2891L11.3857 2.20711Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 22L9 18C9 16.3431 10.3431 15 12 15C13.6569 15 15 16.3431 15 18L15 22"/>
    </svg>
  )
}
