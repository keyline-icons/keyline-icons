import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Plug({ size = 24, ...props }: IconProps) {
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
      <path d="M9 1L9 7M15 1L15 7M12 18L12 23" strokeOpacity="0.4"/>
      <path d="M5 6L19 6C19.5523 6 20 6.4477 20 7L20 11C20 15.2802 16.2802 19 12 19C7.7198 19 4 15.2802 4 11L4 7C4 6.4477 4.4477 6 5 6Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
