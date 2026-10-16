import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GitMerge({ size = 24, ...props }: IconProps) {
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
      <path d="M6 3V15C6.16667 12 8.2 6 15 6M6 21C7.65685 21 9 19.65685 9 18C9 16.34315 7.65685 15 6 15C4.34315 15 3 16.34315 3 18C3 19.65685 4.34315 21 6 21ZM18 9C19.6569 9 21 7.6569 21 6C21 4.3431 19.6569 3 18 3C16.3431 3 15 4.3431 15 6C15 7.6569 16.3431 9 18 9Z"/>
    </svg>
  )
}
