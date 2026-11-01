import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BriefcaseArrowDown({ size = 24, ...props }: IconProps) {
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
      <path d="M12 9L12 14M8.7071 10.7071L12 14L15.2929 10.7071M2 22L22 22M8.5 6L3 6L3 18L21 18L21 6L15.5 6M8.5 6L8.5 2L15.5 2L15.5 6M8.5 6L15.5 6" fill="none"/>
    </svg>
  )
}
