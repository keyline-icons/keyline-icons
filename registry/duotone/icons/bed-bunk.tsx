import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BedBunk({ size = 24, ...props }: IconProps) {
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
      <path d="M6 10L9 10C9.5523 10 10 9.5523 10 9L10 7C10 5.3431 8.6569 4 7 4L3 4C2.4477 4 2 4.4477 2 5L2 9C2 9.5523 2.4477 10 3 10ZM6 18L9 18C9.5523 18 10 17.5523 10 17L10 15C10 13.3431 8.6569 12 7 12L3 12C2.4477 12 2 12.4477 2 13L2 17C2 17.5523 2.4477 18 3 18Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 3L3 5M3 5L3 7L3 9M3 9L3 13M3 9L9 9M3 13L3 15L3 17M3 17L3 21M3 17L9 17M9 9L16 9M16 9L21 9M16 9L16 13M21 9L21 5L21 3M21 9L21 13M9 17L16 17M16 17L21 17M16 17L16 13M16 17L16 20L16 21M21 17L21 13M21 17L21 21M16 13L21 13"/>
    </svg>
  )
}
