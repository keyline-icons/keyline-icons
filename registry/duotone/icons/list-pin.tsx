import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ListPin({ size = 24, ...props }: IconProps) {
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
      <path d="M2 10L7 10M2 15L5 15M2 20L11 20M15.5 15L15.5 20" fill="none" strokeOpacity="0.4"/>
      <path d="M10.5 5C10.5 3.8954 11.3954 3 12.5 3L18.5 3C19.6046 3 20.5 3.8954 20.5 5L20.5 6C20.5 7.1046 19.6046 8 18.5 8L18.5 8L18.5 9.9648L22.3321 12.5195C22.7493 12.7977 23 13.2661 23 13.7676L23 14.5C23 15.3284 22.3284 16 21.5 16L9.5 16C8.6716 16 8 15.3284 8 14.5L8 13.7676C8 13.2661 8.2507 12.7977 8.6679 12.5195L12.5 9.9648L12.5 8L12.5 8C11.3954 8 10.5 7.1046 10.5 6L10.5 5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
