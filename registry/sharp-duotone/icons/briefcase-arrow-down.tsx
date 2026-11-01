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
      <path d="M22 6L22 18C22 18.5523 21.5523 19 21 19L3 19C2.4477 19 2 18.5523 2 18L2 6C2 5.4477 2.4477 5 3 5L21 5C21.5523 5 22 5.4477 22 6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8.5 6L8.5 2L15.5 2L15.5 6M12 9L12 14M8.7071 10.7071L12 14L15.2929 10.7071M2 22L22 22" fill="none"/>
    </svg>
  )
}
