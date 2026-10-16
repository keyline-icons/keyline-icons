import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ExpandDashedDownRight({ size = 24, ...props }: IconProps) {
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
      <path d="M6 11L6 21M3 18L6 21L9 18M11 6L21 6M18 9L21 6L18 3"/>
      <path d="M21 13L21 14.3333M21 18.3333C21 19.8061 19.8061 21 18.3333 21M14.3333 21L13 21" strokeOpacity="0.4"/>
    </svg>
  )
}
