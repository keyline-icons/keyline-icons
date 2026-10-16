import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TableColumnsRemoveAfter({ size = 24, ...props }: IconProps) {
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
      <path d="M20 6L20 3L11 3M11 21L20 21L20 18" strokeOpacity="0.4"/>
      <path d="M12 2L12 22L2 22C1.4477 22 1 21.5523 1 21L1 3C1 2.4477 1.4477 2 2 2L12 2Z" fill="currentColor" stroke="none"/>
      <path d="M15.7071 8.7071L22.2929 15.2929M22.2929 8.7071L15.7071 15.2929"/>
    </svg>
  )
}
