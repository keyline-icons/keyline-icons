import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Screwdriver({ size = 24, ...props }: IconProps) {
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
      <path d="M12.4394 11.5607L13.9381 13.6819L7.1214 21.1213C5.9498 22.2929 4.0503 22.2929 2.8787 21.1213C1.7071 19.9497 1.7071 18.0503 2.8787 16.8787L10.3181 10.0618ZM12.4394 11.5607L17 7M17 7L17 4L21 2L22 3L20 7Z" fill="none"/>
    </svg>
  )
}
