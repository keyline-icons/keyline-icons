import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ZodiacGemini({ size = 24, ...props }: IconProps) {
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
      <path d="M2 4C5.1686 5.3203 8.5673 6 12 6C15.4327 6 18.8314 5.3203 22 4M2 20C5.1686 18.6797 8.5673 18 12 18C15.4327 18 18.8314 18.6797 22 20M8.5 5.7633L8.5 18.2367M15.5 5.7633L15.5 18.2367"/>
    </svg>
  )
}
