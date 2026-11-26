import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrainFrontTunnel({ size = 24, ...props }: IconProps) {
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
      <path d="M12 6L18 6C18.5523 6 19 6.4477 19 7L19 19C19 19.5523 18.5523 20 18 20L6 20C5.4477 20 5 19.5523 5 19L5 7C5 6.4477 5.4477 6 6 6ZM12 8L7 8L7 10L17 10L17 8ZM11 15C11 14.4477 10.5523 14 10 14C9.4477 14 9 14.4477 9 15C9 15.5523 9.4477 16 10 16C10.5523 16 11 15.5523 11 15ZM15 15C15 14.4477 14.5523 14 14 14C13.4477 14 13 14.4477 13 15C13 15.5523 13.4477 16 14 16C14.5523 16 15 15.5523 15 15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 23L2 2L22 2L22 23M8 19L6.2236 22.5528M16 19L17.7764 22.5528"/>
    </svg>
  )
}
