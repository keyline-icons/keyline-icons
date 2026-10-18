import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigLeftDash({ size = 24, ...props }: IconProps) {
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
      <path d="M2.2929 12.7071L9.2929 19.7071C9.5789 19.9931 10.009 20.0787 10.3827 19.9239C10.7564 19.7691 11 19.4045 11 19L11 17C11 16.4477 11.4477 16 12 16L17 16C17.5523 16 18 15.5523 18 15L18 9C18 8.4477 17.5523 8 17 8L12 8C11.4477 8 11 7.5523 11 7L11 5C11 4.5955 10.7564 4.2309 10.3827 4.0761C10.009 3.9213 9.5789 4.0069 9.2929 4.2929L2.2929 11.2929C1.9024 11.6834 1.9024 12.3166 2.2929 12.7071ZM22 8L22 16" fill="none"/>
    </svg>
  )
}
