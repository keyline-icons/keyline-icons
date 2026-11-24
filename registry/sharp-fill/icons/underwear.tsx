import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Underwear({ size = 24, ...props }: IconProps) {
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
      <path d="M12 4L22 4C22.5523 4 23 4.4477 23 5L23 10C23 10.4304 22.7246 10.8126 22.3162 10.9487L16.8167 12.7819L14.9615 19.2747C14.8389 19.704 14.4465 20 14 20L10 20C9.5535 20 9.1611 19.704 9.0385 19.2747L7.1833 12.7819L1.6838 10.9487C1.2754 10.8126 1 10.4304 1 10L1 5C1 4.4477 1.4477 4 2 4Z" fill="currentColor"/>
    </svg>
  )
}
