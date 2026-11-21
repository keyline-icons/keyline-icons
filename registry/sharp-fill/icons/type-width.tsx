import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TypeWidth({ size = 24, ...props }: IconProps) {
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
      <path d="M4 6L4 5L4 2L20 2L20 5L20 6M12 2L12 12M7.5 12L8.5 12L15.5 12L16.5 12M20 19L4 19M16.7071 15.7071L17 16L20 19L17 22L16.7071 22.2929M7.2929 15.7071L7 16L4 19L7 22L7.2929 22.2929"/>
    </svg>
  )
}
