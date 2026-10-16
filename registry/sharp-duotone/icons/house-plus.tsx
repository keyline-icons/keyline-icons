import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HousePlus({ size = 24, ...props }: IconProps) {
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
      <path d="M11.3857 3.20703C11.7469 2.92599 12.253 2.92599 12.6142 3.20703L13 3.50684V11H21V22C20.9999 22.5522 20.5522 23 20 23H3.99996C3.44776 23 3.00007 22.5522 2.99996 22V12.2666L2.22848 12.8672L0.999962 11.2891L11.3857 3.20703Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 23L9 19C9 17.3431 10.3431 16 12 16C13.6569 16 15 17.3431 15 19L15 23M19 1L19 2L19 8L19 9M15 5L16 5L22 5L23 5"/>
    </svg>
  )
}
