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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12.7071 3.2929L21.7071 12.2929C21.9931 12.5789 22.0787 13.009 21.9239 13.3827C21.7691 13.7564 21.4045 14 21 14L18 14C17.4477 14 17 14.4477 17 15L17 20C17 20.5523 16.5523 21 16 21L8 21C7.4477 21 7 20.5523 7 20L7 15C7 14.4477 6.5523 14 6 14L3 14C2.5955 14 2.2309 13.7564 2.0761 13.3827C1.9213 13.009 2.0069 12.5789 2.2929 12.2929L11.2929 3.2929C11.6834 2.9024 12.3166 2.9024 12.7071 3.2929Z"/>
    </svg>
  )
}
