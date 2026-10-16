import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ListCollapseHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M2 6L10 6M6.7071 2.7071L10 6L6.7071 9.2929M22 6L14 6M17.2929 2.7071L14 6L17.2929 9.2929" strokeOpacity="0.4"/>
      <path d="M6 12L6 22M12 12L12 22M18 12L18 22"/>
    </svg>
  )
}
