import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Shuffle2({ size = 24, ...props }: IconProps) {
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
      <path d="M2.7071 2.7071L9.8787 9.8787M14.1213 14.1213L20.8243 20.8243M14 21L21 21L21 14" fill="none" strokeOpacity="0.4"/>
      <path d="M2.7071 21.2929L20.8243 3.1757M14 3L21 3L21 10" fill="none"/>
    </svg>
  )
}
