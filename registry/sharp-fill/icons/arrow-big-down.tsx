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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11.2929 22.7071L3.2929 14.7071C3.0069 14.4211 2.9213 13.991 3.0761 13.6173C3.2309 13.2436 3.5955 13 4 13L7 13L7 2C7 1.4477 7.4477 1 8 1L16 1C16.5523 1 17 1.4477 17 2L17 13L20 13C20.4045 13 20.7691 13.2436 20.9239 13.6173C21.0787 13.991 20.9931 14.4211 20.7071 14.7071L12.7071 22.7071C12.3166 23.0976 11.6834 23.0976 11.2929 22.7071Z" fill="currentColor"/>
    </svg>
  )
}
