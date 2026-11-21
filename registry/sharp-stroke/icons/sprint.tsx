import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sprint({ size = 24, ...props }: IconProps) {
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
      <path d="M19.6838 12.2721L19 12.5L16 13.5001L15 9.5L9 8.5L6 11.5L5.7071 11.7929M2.5615 21.1725L6.5 18.4999L7 16L7.1608 15.1961M10.7 20.4L11 20L14 16L10 13.5L14.5 9.5L14.5615 9.4453M19 3C20.1046 3 21 3.8954 21 5C21 6.1046 20.1046 7 19 7C17.8954 7 17 6.1046 17 5C17 3.8954 17.8954 3 19 3Z" fill="none"/>
    </svg>
  )
}
