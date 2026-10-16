import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Database({ size = 24, ...props }: IconProps) {
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
      <path d="M20 4C20 5.1046 16.4184 6 12 6C7.5816 6 4 5.1046 4 4C4 2.8954 7.5816 2 12 2C16.4184 2 20 2.8954 20 4ZM4 4L4 20C4 21.1046 7.5816 22 12 22C16.4184 22 20 21.1046 20 20L20 4M4 12C4 13.1046 7.5816 14 12 14C16.4184 14 20 13.1046 20 12"/>
    </svg>
  )
}
