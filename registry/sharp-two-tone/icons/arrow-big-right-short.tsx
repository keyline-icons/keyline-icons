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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M21.7071 12.7071L11.7071 22.7071C11.4211 22.9931 10.991 23.0787 10.6173 22.9239C10.2436 22.7691 10 22.4045 10 22L10 18L3 18C2.4477 18 2 17.5523 2 17L2 7C2 6.4477 2.4477 6 3 6L10 6L10 2C10 1.5955 10.2436 1.2309 10.6173 1.0761C10.991 0.9213 11.4211 1.0069 11.7071 1.2929L21.7071 11.2929C22.0976 11.6834 22.0976 12.3166 21.7071 12.7071Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M21 12L11 22L11 17L3 17L3 7L11 7L11 2Z"/>
    </svg>
  )
}
