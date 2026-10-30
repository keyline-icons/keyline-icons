import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Wheelchair({ size = 24, ...props }: IconProps) {
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
      <path d="M13.9216 18.5744L13.209 19.276C12.126 20.3422 10.6398 21 9 21C5.6863 21 3 18.3137 3 15C3 13.223 3.7725 11.6264 5 10.5278L5.7451 9.8609" fill="none" strokeOpacity="0.4"/>
      <path d="M9 8L9 15L16 15L18 21L22 21M9 11L14 11" fill="none"/>
      <path d="M12 4C12 5.1046 11.1046 6 10 6C8.8954 6 8 5.1046 8 4C8 2.8954 8.8954 2 10 2C11.1046 2 12 2.8954 12 4Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
