import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function InboxDot({ size = 24, ...props }: IconProps) {
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
      <path d="M21.6133 11.5228L22 12.1534L22 20L2 20L2 12.1534L7 4L15 4M2 13L8 13L10 16L14 16L16 13L22 13M22 6C22 7.1046 21.1046 8 20 8C18.8954 8 18 7.1046 18 6C18 4.8954 18.8954 4 20 4C21.1046 4 22 4.8954 22 6Z" fill="none"/>
    </svg>
  )
}
