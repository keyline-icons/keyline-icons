import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Home({ size = 24, ...props }: IconProps) {
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
      <path d="M21.61 9.21C21.86 9.4 22 9.69 22 10V21C22 21.55 21.55 22 21 22H3C2.45 22 2 21.55 2 21V10C2 9.69 2.14 9.4 2.39 9.21L11.39 2.21C11.75 1.93 12.25 1.93 12.61 2.21L21.61 9.21Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 22L9 14L15 14L15 22"/>
    </svg>
  )
}
