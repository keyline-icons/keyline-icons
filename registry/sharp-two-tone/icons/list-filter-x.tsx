import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ListFilterX({ size = 24, ...props }: IconProps) {
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
      <path d="M1 7L2 7L14 7L15 7" strokeOpacity="0.4"/>
      <path d="M5 13L6 13L18 13L19 13M9 19L10 19L14 19L15 19M17.7071 4.7071L18 5L22 9L22.2929 9.2929M22.2929 4.7071L22 5L18 9L17.7071 9.2929"/>
    </svg>
  )
}
