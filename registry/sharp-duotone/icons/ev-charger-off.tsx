import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function EvChargerOff({ size = 24, ...props }: IconProps) {
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
      <path d="M15 18L15 21L21 21L22.2929 22.2929L21.5858 23L2 23C1.4477 23 1 22.5523 1 22L1 2.4142L1.7071 1.7071L7.8571 7.8571L5.2 11.4C5.0701 11.5731 4.9998 11.7837 4.9998 12.0002C4.9998 12.5525 5.4477 13.0002 6 13L8 13L5.9 15.8L7.5 17L10.8 12.6C10.9299 12.4269 11.0002 12.2163 11.0002 11.9998C11.0002 11.4475 10.5523 10.9998 10 11L8 11L9.2857 9.2857L15 15L15 16L17 16L17 18L15 18ZM19 5L21 5L21 3L23 3L23 10C23 10.5523 22.5523 11 22 11L21 11L21 15.3431L19 15.3431L19 11L18 11C17.4477 11 17 10.5523 17 10L17 3L19 3L19 5ZM4.6569 1L14 1C14.5523 1 15 1.4477 15 2L15 11.3431L4.6569 1Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
