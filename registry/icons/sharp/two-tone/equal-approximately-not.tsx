import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function EqualApproximatelyNot({ size = 24, ...props }: IconProps) {
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
      <path d="M4.7241 8.7897L5 8.5C5.9123 7.5421 7.1772 7 8.5 7C9.8228 7 11.0877 7.5421 12 8.5C12.9123 9.4579 14.1772 10 15.5 10C16.8228 10 18.0877 9.4579 19 8.5L19.2759 8.2103M4.7241 15.7897L5 15.5C5.9123 14.5421 7.1772 14 8.5 14C9.8228 14 11.0877 14.5421 12 15.5C12.9123 16.4579 14.1772 17 15.5 17C16.8228 17 18.0877 16.4579 19 15.5L19.2759 15.2103M8.7403 19.6061L15.2597 4.3939"/>
    </svg>
  )
}
