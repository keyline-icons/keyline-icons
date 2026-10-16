import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Mars({ size = 24, ...props }: IconProps) {
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
      <path d="M15 15C15 18.3137 12.3137 21 9 21C5.6863 21 3 18.3137 3 15C3 11.6863 5.6863 9 9 9C12.3137 9 15 11.6863 15 15ZM15.5 3L20.5 3C20.7761 3 21 3.2239 21 3.5L21 8.5M13.2426 10.7574L20.4 3.6" fill="none"/>
    </svg>
  )
}
