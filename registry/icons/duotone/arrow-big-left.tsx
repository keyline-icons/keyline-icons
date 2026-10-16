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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2.2929 11.2929L9.2929 4.2929C9.5789 4.0069 10.009 3.9213 10.3827 4.0761C10.7564 4.2309 11 4.5955 11 5L11 7C11 7.5523 11.4477 8 12 8L21 8C21.5523 8 22 8.4477 22 9L22 15C22 15.5523 21.5523 16 21 16L12 16C11.4477 16 11 16.4477 11 17L11 19C11 19.4045 10.7564 19.7691 10.3827 19.9239C10.009 20.0787 9.5789 19.9931 9.2929 19.7071L2.2929 12.7071C1.9024 12.3166 1.9024 11.6834 2.2929 11.2929Z"/>
    </svg>
  )
}
