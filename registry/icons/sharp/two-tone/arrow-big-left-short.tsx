import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigLeftShort({ size = 24, ...props }: IconProps) {
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
      <path d="M2.2929 11.2929L12.2929 1.2929C12.5789 1.0069 13.009 0.9213 13.3827 1.0761C13.7564 1.2309 14 1.5955 14 2L14 6L21 6C21.5523 6 22 6.4477 22 7L22 17C22 17.5523 21.5523 18 21 18L14 18L14 22C14 22.4045 13.7564 22.7691 13.3827 22.9239C13.009 23.0787 12.5789 22.9931 12.2929 22.7071L2.2929 12.7071C1.9024 12.3166 1.9024 11.6834 2.2929 11.2929Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 12L13 2L13 7L21 7L21 17L13 17L13 22Z"/>
    </svg>
  )
}
