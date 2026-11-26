import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Minimize2({ size = 24, ...props }: IconProps) {
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
      <path d="M9 2L9 9L2 9M2.7071 2.7071L8.8243 8.8243M15 2L15 9L22 9M21.2929 2.7071L15.1757 8.8243M15 22L15 15L22 15M21.2929 21.2929L15.1757 15.1757M9 22L9 15L2 15M2.7071 21.2929L8.8243 15.1757" fill="none"/>
    </svg>
  )
}
