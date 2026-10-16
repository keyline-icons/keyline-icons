import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HockeySticks({ size = 24, ...props }: IconProps) {
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
      <path d="M4.2904 6.0379C4.1005 5.725 4 5.366 4 5C4 3.8954 4.8954 3 6 3C6.6988 3 7.3469 3.3647 7.7096 3.962L15.6255 17L19 17C20.1046 17 21 17.8954 21 19C21 20.1046 20.1046 21 19 21L13.3745 21L4.2904 6.0379ZM14.0477 7.6559L14.3398 7.1749L16.2904 3.962C16.6531 3.3647 17.3012 3 18 3C19.1046 3 20 3.8954 20 5C20 5.366 19.8995 5.725 19.7096 6.0379L16.6795 11.0286L16.3875 11.5096M9.695 21L8.695 21L5 21C3.8954 21 3 20.1046 3 19C3 17.8954 3.8954 17 5 17L6.2664 17L7.2664 17" fill="none"/>
    </svg>
  )
}
