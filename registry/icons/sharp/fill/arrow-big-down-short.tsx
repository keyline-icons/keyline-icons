import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigDownShort({ size = 24, ...props }: IconProps) {
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
      <path d="M11.2929 21.7071L1.2929 11.7071C1.0069 11.4211 0.9213 10.991 1.0761 10.6173C1.2309 10.2436 1.5955 10 2 10L6 10L6 3C6 2.4477 6.4477 2 7 2L17 2C17.5523 2 18 2.4477 18 3L18 10L22 10C22.4045 10 22.7691 10.2436 22.9239 10.6173C23.0787 10.991 22.9931 11.4211 22.7071 11.7071L12.7071 21.7071C12.3166 22.0976 11.6834 22.0976 11.2929 21.7071Z" fill="currentColor"/>
    </svg>
  )
}
