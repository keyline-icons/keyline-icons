import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SymmetryHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M7 4L17 4C17.4226 4 17.7996 4.2657 17.9417 4.6637L22.9417 18.6637C22.9803 18.7716 23 18.8854 23 19C23 19.5523 22.5523 20 22 20L2 20C1.4477 20 1 19.5523 1 19C1 18.8854 1.0197 18.7716 1.0583 18.6637L6.0583 4.6637C6.2004 4.2657 6.5774 4 7 4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 1L12 23" fill="none"/>
    </svg>
  )
}
