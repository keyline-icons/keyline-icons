import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigRightShort({ size = 24, ...props }: IconProps) {
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
      <path d="M20.7071 12.7071L11.7071 21.7071C11.4211 21.9931 10.991 22.0787 10.6173 21.9239C10.2436 21.7691 10 21.4045 10 21L10 18C10 17.4477 9.5523 17 9 17L4 17C3.4477 17 3 16.5523 3 16L3 8C3 7.4477 3.4477 7 4 7L9 7C9.5523 7 10 6.5523 10 6L10 3C10 2.5955 10.2436 2.2309 10.6173 2.0761C10.991 1.9213 11.4211 2.0069 11.7071 2.2929L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071Z"/>
    </svg>
  )
}
