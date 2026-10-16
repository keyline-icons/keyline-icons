import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowDownWideNarrow({ size = 24, ...props }: IconProps) {
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
      <path d="M14 6L22 6M14 10L20 10M14 14L18 14M14 18L16 18" strokeOpacity="0.4"/>
      <path d="M6 6L6 18M2 14L5.6464 17.6464C5.8417 17.8417 6.1583 17.8417 6.3536 17.6464L10 14"/>
    </svg>
  )
}
