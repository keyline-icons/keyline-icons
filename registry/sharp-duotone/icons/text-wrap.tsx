import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TextWrap({ size = 24, ...props }: IconProps) {
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
      <path d="M2 3L22 3M2 15L3 15L8 15L9 15M2 21L15 21L16 21" strokeOpacity="0.4"/>
      <path d="M2 9L3 9L18 9C19.6569 9 21 10.3431 21 12C21 13.6569 19.6569 15 18 15L12 15M14.2929 12.7071L14 13L12 15L14 17L14.2929 17.2929"/>
    </svg>
  )
}
