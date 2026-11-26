import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Signpost({ size = 24, ...props }: IconProps) {
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
      <path d="M6 4L18.8238 4L21.9994 6.5L18.8238 9L6 9ZM18 13L18 18L5.1762 18L2.0006 15.5L5.1762 13ZM12 1L12 4M12 9L12 13M12 18L12 22M7 22L17 22"/>
    </svg>
  )
}
