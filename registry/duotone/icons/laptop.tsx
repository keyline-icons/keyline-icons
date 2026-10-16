import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Laptop({ size = 24, ...props }: IconProps) {
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
      <path d="M6 3L18 3C19.6569 3 21 4.3431 21 6L21 17L3 17L3 6C3 4.3431 4.3431 3 6 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2.5 16L21.5 16C21.7761 16 22 16.2239 22 16.5L22 18C22 19.1046 21.1046 20 20 20L4 20C2.8954 20 2 19.1046 2 18L2 16.5C2 16.2239 2.2239 16 2.5 16Z"/>
    </svg>
  )
}
