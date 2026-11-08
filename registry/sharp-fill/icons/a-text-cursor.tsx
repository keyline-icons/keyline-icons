import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ATextCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M1.93 18.6273L7.002 6L12.074 18.6273M4.19 13H9.813M19.002 6.8C18.668 6.35 17.602 5 16.002 5H15.002M19.002 6.8C19.335 6.35 20.402 5 22.002 5H23.002M19.002 6.8V17.2M19.002 17.2C19.335 17.65 20.402 19 22.002 19H23.002M19.002 17.2C18.668 17.65 17.602 19 16.002 19H15.002"/>
    </svg>
  )
}
