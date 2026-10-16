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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11.2929 20.7071L2.2929 11.7071C2.0069 11.4211 1.9213 10.991 2.0761 10.6173C2.2309 10.2436 2.5955 10 3 10L6 10C6.5523 10 7 9.5523 7 9L7 4C7 3.4477 7.4477 3 8 3L16 3C16.5523 3 17 3.4477 17 4L17 9C17 9.5523 17.4477 10 18 10L21 10C21.4045 10 21.7691 10.2436 21.9239 10.6173C22.0787 10.991 21.9931 11.4211 21.7071 11.7071L12.7071 20.7071C12.3166 21.0976 11.6834 21.0976 11.2929 20.7071Z"/>
    </svg>
  )
}
