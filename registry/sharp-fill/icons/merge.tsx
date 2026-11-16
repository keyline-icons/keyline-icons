import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Merge({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2V10.648M15.293 5.293L12 2L8.707 5.293M12 10.648C12 14.707 13.671 18.497 16.453 20.748L18 22L18.293 22.293M12 10.648C12 14.707 10.329 18.497 7.547 20.748L6 22L5.707 22.293"/>
    </svg>
  )
}
