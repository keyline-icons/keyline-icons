import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TableRowsMoveDown({ size = 24, ...props }: IconProps) {
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
      <path d="M6 20L3 20L3 11M21 11L21 20L18 20" strokeOpacity="0.4"/>
      <path d="M2 2C2 1.4477 2.4477 1 3 1L21 1C21.5523 1 22 1.4477 22 2L22 12L2 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 15L12 22M8.7071 18.7071L12 22L15.2929 18.7071"/>
    </svg>
  )
}
