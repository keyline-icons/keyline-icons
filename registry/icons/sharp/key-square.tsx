import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function KeySquare({ size = 24, ...props }: IconProps) {
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
      <path d="M6 14.5L2 18.5L2 22L5.5 22L7 20.5L9.5 20.5L9.5 18L12 18L12 15.5L13.5 14L22 14L22 2L10 2L10 10.5ZM14.7071 9.2929L17.2929 6.7071" fill="none"/>
    </svg>
  )
}
