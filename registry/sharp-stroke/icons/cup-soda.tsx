import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CupSoda({ size = 24, ...props }: IconProps) {
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
      <path d="M6 10H18M6 10C5.448 10 5 9.55 5 9C5 8.78 5.07 8.57 5.2 8.4L7 6H17L18.8 8.4C18.93 8.57 19 8.78 19 9C19 9.55 18.552 10 18 10M6 10L9 22H15L18 10M11 6L13 2H17"/>
    </svg>
  )
}
