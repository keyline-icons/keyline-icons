import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Stop({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5 4L19 4C19.5523 4 20 4.4477 20 5L20 19C20 19.5523 19.5523 20 19 20L5 20C4.4477 20 4 19.5523 4 19L4 5C4 4.4477 4.4477 4 5 4Z" fill="currentColor"/>
    </svg>
  )
}
