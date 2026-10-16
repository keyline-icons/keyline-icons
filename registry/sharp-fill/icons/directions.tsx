import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Directions({ size = 24, ...props }: IconProps) {
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
      <path d="M16 19C16 21.2091 14.2091 23 12 23C9.7909 23 8 21.2091 8 19C8 16.7909 9.7909 15 12 15C14.2091 15 16 16.7909 16 19Z" fill="currentColor" stroke="none"/>
      <path d="M12 16C12 13.7909 13.7909 12 16 12L22 12M18.7071 8.7071L22 12L18.7071 15.2929M12 10L12 2M8.7071 5.2929L12 2L15.2929 5.2929M10 12L2 12M5.2929 15.2929L2 12L5.2929 8.7071" fill="none"/>
    </svg>
  )
}
