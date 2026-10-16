import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HomeSimple({ size = 24, ...props }: IconProps) {
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
      <path d="M11.3857 2.2071C11.7469 1.92603 12.2531 1.92603 12.6143 2.2071L21.6143 9.21101C21.8575 9.40048 22 9.6917 22 10.0001V21.0001C21.9998 21.5522 21.5522 22.0001 21 22.0001H3C2.44783 22.0001 2.00018 21.5522 2 21.0001V10.0001C2 9.6917 2.14246 9.40048 2.38574 9.21101L11.3857 2.2071Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M21 10L12 2.9963L3 10L3 21L21 21Z"/>
    </svg>
  )
}
