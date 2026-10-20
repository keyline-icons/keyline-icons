import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Gripper({ size = 24, ...props }: IconProps) {
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
      <path d="M16 10C16 12.2091 14.2091 14 12 14C9.7909 14 8 12.2091 8 10C8 7.7909 9.7909 6 12 6C14.2091 6 16 7.7909 16 10Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 1L12 7M14.4575 11.7207L20 16.0638L15.7027 22.4412M9.5425 11.7207L4 16.0638L8.2973 22.4412M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.3431 10.3431 7 12 7C13.6569 7 15 8.3431 15 10Z" fill="none"/>
    </svg>
  )
}
