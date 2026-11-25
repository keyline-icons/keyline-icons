import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VectorSkew({ size = 24, ...props }: IconProps) {
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
      <path d="M8 3L12 3L12 7L8 7ZM17 3L21 3L21 7L17 7ZM12 17L16 17L16 21L12 21ZM3 17L7 17L7 21L3 21ZM12 5L17 5M19 7L14 17M12 19L7 19M5 17L10 7" fill="none"/>
    </svg>
  )
}
