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
      <path d="M1.7071 1.7071L15 15L15 22C15 22.5523 14.5523 23 14 23L2 23C1.4477 23 1 22.5523 1 22L1 2.4142L1.7071 1.7071ZM19 5L21 5L21 3L23 3L23 10C23 10.5523 22.5523 11 22 11L21 11L21 15.3431L19 15.3431L19 11L18 11C17.4477 11 17 10.5523 17 10L17 3L19 3L19 5ZM4.7426 1L14 1C14.5523 1 15 1.4477 15 2L15 11.2574L4.7426 1Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M14 14L14 22L2 22L2 2M14 22L22 22M14 17L17 17M8.5714 8.5714L6 12L10 12L6.7 16.4M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
