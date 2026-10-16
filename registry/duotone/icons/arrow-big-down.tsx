import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigDown({ size = 24, ...props }: IconProps) {
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
      <path d="M11.2929 21.7071L4.2929 14.7071C4.0069 14.4211 3.9213 13.991 4.0761 13.6173C4.2309 13.2436 4.5955 13 5 13L7 13C7.5523 13 8 12.5523 8 12L8 3C8 2.4477 8.4477 2 9 2L15 2C15.5523 2 16 2.4477 16 3L16 12C16 12.5523 16.4477 13 17 13L19 13C19.4045 13 19.7691 13.2436 19.9239 13.6173C20.0787 13.991 19.9931 14.4211 19.7071 14.7071L12.7071 21.7071C12.3166 22.0976 11.6834 22.0976 11.2929 21.7071Z"/>
    </svg>
  )
}
