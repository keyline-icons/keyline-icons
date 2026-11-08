import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChevronsCompactFourDirections({ size = 24, ...props }: IconProps) {
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
      <path d="M4 15L2.0733 12.22C1.9756 12.08 1.9756 11.92 2.0733 11.78L4 9M15 20L12.2236 21.93C12.0828 22.02 11.9172 22.02 11.7764 21.93L9 20M20 15L21.927 12.22C22.024 12.08 22.024 11.92 21.927 11.78L20 9M15 4L12.2236 2.07C12.0828 1.98 11.9172 1.98 11.7764 2.07L9 4"/>
    </svg>
  )
}
