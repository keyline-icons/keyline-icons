import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SmartphoneX({ size = 24, ...props }: IconProps) {
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
      <path d="M20 2L20 12C20 12.5523 19.5523 13 19 13L10 13L10 22C10 22.5523 9.5523 23 9 23C6.2386 23 4 20.7614 4 18L4 2C4 1.4477 4.4477 1 5 1L19 1C19.5523 1 20 1.4477 20 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M19 13L19 2L5 2L5 22L10 22M19.2929 15.7071L12.7071 22.2929M12.7071 15.7071L19.2929 22.2929M14.5 6L9.5 6"/>
    </svg>
  )
}
