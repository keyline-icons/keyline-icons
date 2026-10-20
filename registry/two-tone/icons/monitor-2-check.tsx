import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Monitor2Check({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12.9922L23 14C23 16.2092 21.2092 18 19 18L5 18C2.7908 18 1 16.2092 1 14L1 6C1 3.7908 2.7908 2 5 2L13 2.0001L12.0001 2.0001C12.5493 2.0001 12.9957 2.443 13 2.9922L13 10C13 11.1046 13.8954 12 15 12L23 12.0001L22.012 12.0001C22.5565 12.0066 22.9957 12.4477 23 12.9922Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 3L5 3C3.3431 3 2 4.3431 2 6L2 14C2 15.6569 3.3431 17 5 17L19 17C20.6569 17 22 15.6569 22 14L22 13M12 17L12 21M8 21L16 21M16 6L18 8L22 4" fill="none"/>
    </svg>
  )
}
