import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CreditCardX({ size = 24, ...props }: IconProps) {
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
      <path d="M22 9L22 7C22 5.3431 20.6569 4 19 4L5 4C3.3431 4 2 5.3431 2 7L2 17C2 18.6569 3.3431 20 5 20L12 20M2 9L22 9M16 14L22 20M22 14L16 20" fill="none"/>
    </svg>
  )
}
