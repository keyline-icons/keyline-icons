import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WindowAwning({ size = 24, ...props }: IconProps) {
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
      <path d="M4 9H12M4 9V15M4 9V4C4 3.448 4.448 3 5 3H19C19.552 3 20 3.448 20 4V9M12 9H20M12 9V15M4 15V21M4 15H12M20 9V15M12 15V21M12 15H20M20 15V21M2 21H4M4 21H12M12 21H20M20 21H22"/>
    </svg>
  )
}
