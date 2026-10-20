import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Monitor2Plus({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 3L5 3C3.3431 3 2 4.3431 2 6L2 14C2 15.6569 3.3431 17 5 17L19 17C20.6569 17 22 15.6569 22 14L22 13M12 17L12 21M8 21L16 21M19 3L19 9M16 6L22 6" fill="none"/>
    </svg>
  )
}
