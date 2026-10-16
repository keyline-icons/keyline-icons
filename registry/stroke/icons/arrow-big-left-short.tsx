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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3.2929 11.2929L12.2929 2.2929C12.5789 2.0069 13.009 1.9213 13.3827 2.0761C13.7564 2.2309 14 2.5955 14 3L14 6C14 6.5523 14.4477 7 15 7L20 7C20.5523 7 21 7.4477 21 8L21 16C21 16.5523 20.5523 17 20 17L15 17C14.4477 17 14 17.4477 14 18L14 21C14 21.4045 13.7564 21.7691 13.3827 21.9239C13.009 22.0787 12.5789 21.9931 12.2929 21.7071L3.2929 12.7071C2.9024 12.3166 2.9024 11.6834 3.2929 11.2929Z"/>
    </svg>
  )
}
