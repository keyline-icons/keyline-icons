import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LaptopCheck({ size = 24, ...props }: IconProps) {
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
      <path d="M4 16L4 6C4 4.8954 4.8954 4 6 4L12 4M20 14L20 16M2.5 16L21.5 16C21.7761 16 22 16.2239 22 16.5L22 18C22 19.1046 21.1046 20 20 20L4 20C2.8954 20 2 19.1046 2 18L2 16.5C2 16.2239 2.2239 16 2.5 16ZM16 7L18 9L22 5"/>
    </svg>
  )
}
