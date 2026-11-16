import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WindowAwningOpen({ size = 24, ...props }: IconProps) {
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
      <path d="M12 3H4.8417C4.3553 3 3.9394 3.35 3.8564 3.829L3.0477 8.5L2.3106 12.757C2.1528 13.389 2.6302 14 3.2808 14H4M4 14V21M4 14H12M3.0477 8.5H12M20 14H20.7192C21.3698 14 21.8472 13.389 21.6894 12.757L20.9523 8.5L20.1436 3.829C20.0606 3.35 19.6447 3 19.1583 3H12M12 3V8.5M20 14V21M20 14H12M20.9523 8.5H12M12 8.5V14M2 21H4M4 21H20M20 21H22"/>
    </svg>
  )
}
