import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HouseSimple({ size = 24, ...props }: IconProps) {
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
      <path d="M11.3857 2.20711C11.7469 1.92603 12.253 1.92603 12.6142 2.20711L23 10.2891L21.7714 11.8673L21 11.2667V21.0001C20.9999 21.5523 20.5522 22.0001 20 22.0001H3.99996C3.44776 22.0001 3.00007 21.5523 2.99996 21.0001V11.2667L2.22848 11.8673L0.999962 10.2891L11.3857 2.20711Z" fill="currentColor"/>
    </svg>
  )
}
