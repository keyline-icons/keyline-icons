import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SmartphoneArrowInUp({ size = 24, ...props }: IconProps) {
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
      <path d="M5 1L19 1C19.5523 1 20 1.4477 20 2L20 13L10 13L10 23L5 23C4.4477 23 4 22.5523 4 22L4 2C4 1.4477 4.4477 1 5 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14.5 6L9.5 6M16 23L16 16M19.2929 19.2929L16 16L12.7071 19.2929"/>
    </svg>
  )
}
