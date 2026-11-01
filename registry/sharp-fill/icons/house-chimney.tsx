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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11.3857 2.2071C11.5613 2.0705 11.7775 1.9963 12 1.9963C12.2224 1.9963 12.4386 2.0705 12.6142 2.2071L15 4.0626L15 3.0001C15 2.4478 15.4477 2.0001 16 2.0001L20 2.0001C20.5523 2.0001 21 2.4478 21 3.0001L21 8.7325L23 10.2891L21.7714 11.8673L21 11.2667L21 21.0001C20.9997 21.5523 20.5522 21.9998 20 22.0001L4 22.0001C3.4478 21.9998 3.0002 21.5523 3 21.0001L3 11.2667L2.2285 11.8673L1 10.2891L11.3857 2.2071ZM9 20L15 20L15 18C15 16.3431 13.6569 15 12 15C10.3431 15 9 16.3431 9 18L9 20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
