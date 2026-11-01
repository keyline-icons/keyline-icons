import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HotTub({ size = 24, ...props }: IconProps) {
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
      <path d="M22 12.0001L22 19C22 19.5523 21.5523 20 21 20L3 20C2.4477 20 2 19.5523 2 19L2 12.0001L1 12.0001L1 10.0001L2.988 10.0001C2.992 10 2.996 10 3 10L21 10C21.004 10 21.008 10 21.012 10.0001L23 10.0001L23 12.0001L22 12.0001Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 10.0001L2 3C2 2.4477 2.4477 2 3 2L6 2C7.395 2 8.6892 2.7268 9.4153 3.9179L7.7077 4.9589C7.3446 4.3634 6.6975 4 6 4L4 4L4 10L3 10C2.996 10 2.992 10 2.988 10.0001L2 10.0001Z" fill="currentColor" stroke="none"/>
      <path d="M7.2071 5.7929L10.2929 2.7071M8 19L6.7236 21.5528M16 19L17.2764 21.5528M15 2L15 3.1972C15 4.3727 14.6521 5.5219 14 6.5C13.8919 6.6622 13.7921 6.8291 13.7009 7L13.2301 7.8822M20 2L20 3.1972C20 4.3727 19.6521 5.5219 19 6.5C18.8919 6.6622 18.7921 6.8291 18.7009 7L18.2301 7.8822" fill="none"/>
    </svg>
  )
}
