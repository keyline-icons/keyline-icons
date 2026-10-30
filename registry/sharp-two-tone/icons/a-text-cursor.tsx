import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ATextCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M1.9417 19.6637L7.1788 5L12.4158 19.6637M3.9645 14L10.3931 14" fill="none" strokeOpacity="0.4"/>
      <path d="M19 5.8C18.6667 5.35 17.6 4 16 4L15 4M19 5.8C19.3333 5.35 20.4 4 22 4L23 4M19 5.8L19 18.2M19 18.2C19.3333 18.65 20.4 20 22 20L23 20M19 18.2C18.6667 18.65 17.6 20 16 20L15 20" fill="none"/>
    </svg>
  )
}
