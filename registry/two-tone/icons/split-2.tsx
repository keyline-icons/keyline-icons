import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Split2({ size = 24, ...props }: IconProps) {
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
      <path d="M12 21V15M12 15C12 12 8.828 8.828 6 6L3.6 3.6M12 15C12 12 15.172 8.828 18 6L20.4 3.6M7 3H3.5C3.224 3 3 3.224 3 3.5V7M17 3H20.5C20.776 3 21 3.224 21 3.5V7"/>
    </svg>
  )
}
