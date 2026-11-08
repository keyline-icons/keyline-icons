import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cross({ size = 24, ...props }: IconProps) {
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
      <path d="M15.375 2C15.927 2 16.375 2.45 16.375 3V7.62H21C21.552 7.62 22 8.07 22 8.62V15.38C22 15.93 21.552 16.38 21 16.38H16.375V21C16.375 21.55 15.927 22 15.375 22H8.625C8.073 22 7.625 21.55 7.625 21V16.38H3C2.448 16.38 2 15.93 2 15.38V8.62C2 8.07 2.448 7.62 3 7.62H7.625V3C7.625 2.45 8.073 2 8.625 2H15.375Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 15.38V8.62H8.625V3H15.375V8.62H21V15.38H15.375V21H8.625V15.38H3Z"/>
    </svg>
  )
}
