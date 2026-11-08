import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GuidepointArrowUp({ size = 24, ...props }: IconProps) {
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
      <path d="M16 17C16 15.34 17.343 14 19 14C20.657 14 22 15.34 22 17C22 18.66 20.657 20 19 20C17.343 20 16 18.66 16 17ZM16 17H8M8 17C8 18.66 6.657 20 5 20C3.343 20 2 18.66 2 17C2 15.34 3.343 14 5 14C6.657 14 8 15.34 8 17ZM7.513 10L12 4L16.487 10H7.513Z"/>
    </svg>
  )
}
