import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VectorDistort({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3L7 3L7 7L3 7ZM17 6L21 6L21 10L17 10ZM15 17L19 17L19 21L15 21ZM5 13L9 13L9 17L5 17ZM7 5L17 8M19 10L17 17M15 19L9 15M7 13L5 7" fill="none"/>
    </svg>
  )
}
