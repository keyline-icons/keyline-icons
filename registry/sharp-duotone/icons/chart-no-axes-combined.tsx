import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartNoAxesCombined({ size = 24, ...props }: IconProps) {
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
      <path d="M4 22L4 16M8 22L8 11M12 22L12 14M16 22L16 12.5M20 22L20 9" strokeOpacity="0.4"/>
      <path d="M22.2781 2.7682L13 10.5L7.5 6.5L1.7071 12.2929"/>
    </svg>
  )
}
