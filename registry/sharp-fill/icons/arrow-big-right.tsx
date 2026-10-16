import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigRight({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M22.7071 12.7071L14.7071 20.7071C14.4211 20.9931 13.991 21.0787 13.6173 20.9239C13.2436 20.7691 13 20.4045 13 20L13 17L2 17C1.4477 17 1 16.5523 1 16L1 8C1 7.4477 1.4477 7 2 7L13 7L13 4C13 3.5955 13.2436 3.2309 13.6173 3.0761C13.991 2.9213 14.4211 3.0069 14.7071 3.2929L22.7071 11.2929C23.0976 11.6834 23.0976 12.3166 22.7071 12.7071Z" fill="currentColor"/>
    </svg>
  )
}
