import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Jacket({ size = 24, ...props }: IconProps) {
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
      <path d="M12 22L12 8.9999M17 19L21.9982 19L19 3.4001L15.1315 2.0009L12 8.9999L8.8685 2.0009L5 3.4001L2.0019 19L7 19M7 9L7 10L7 19L7 22L12 22L17 22L17 19L17 10L17 9" fill="none"/>
    </svg>
  )
}
