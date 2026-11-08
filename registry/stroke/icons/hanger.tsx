import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Hanger({ size = 24, ...props }: IconProps) {
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
      <path d="M7 7C7 4.79 8.7909 3 11 3C13.2091 3 15 4.79 15 7C15 8.61 13.5 10 12 11L11.5 11.5M11.6576 11.35L3.1428 20.15C2.8378 20.46 3.0538 21 3.4852 21H20.5149C20.9462 21 21.1622 20.46 20.8572 20.15L12.3424 11.35C12.1533 11.16 11.8467 11.16 11.6576 11.35Z"/>
    </svg>
  )
}
