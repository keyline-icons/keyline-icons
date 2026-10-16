import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M1.2929 11.2929L9.2929 3.2929C9.5789 3.0069 10.009 2.9213 10.3827 3.0761C10.7564 3.2309 11 3.5955 11 4L11 7L22 7C22.5523 7 23 7.4477 23 8L23 16C23 16.5523 22.5523 17 22 17L11 17L11 20C11 20.4045 10.7564 20.7691 10.3827 20.9239C10.009 21.0787 9.5789 20.9931 9.2929 20.7071L1.2929 12.7071C0.9024 12.3166 0.9024 11.6834 1.2929 11.2929Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 12L10 4L10 8L22 8L22 16L10 16L10 20Z"/>
    </svg>
  )
}
