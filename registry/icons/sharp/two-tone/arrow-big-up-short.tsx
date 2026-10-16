import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigUpShort({ size = 24, ...props }: IconProps) {
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
      <path d="M12.7071 2.2929L22.7071 12.2929C22.9931 12.5789 23.0787 13.009 22.9239 13.3827C22.7691 13.7564 22.4045 14 22 14L18 14L18 21C18 21.5523 17.5523 22 17 22L7 22C6.4477 22 6 21.5523 6 21L6 14L2 14C1.5955 14 1.2309 13.7564 1.0761 13.3827C0.9213 13.009 1.0069 12.5789 1.2929 12.2929L11.2929 2.2929C11.6834 1.9024 12.3166 1.9024 12.7071 2.2929Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 3L22 13L17 13L17 21L7 21L7 13L2 13Z"/>
    </svg>
  )
}
