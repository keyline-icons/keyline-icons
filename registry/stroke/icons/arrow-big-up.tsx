import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigUp({ size = 24, ...props }: IconProps) {
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
      <path d="M12.7071 2.2929L19.7071 9.2929C19.9931 9.5789 20.0787 10.009 19.9239 10.3827C19.7691 10.7564 19.4045 11 19 11L17 11C16.4477 11 16 11.4477 16 12L16 21C16 21.5523 15.5523 22 15 22L9 22C8.4477 22 8 21.5523 8 21L8 12C8 11.4477 7.5523 11 7 11L5 11C4.5955 11 4.2309 10.7564 4.0761 10.3827C3.9213 10.009 4.0069 9.5789 4.2929 9.2929L11.2929 2.2929C11.6834 1.9024 12.3166 1.9024 12.7071 2.2929Z"/>
    </svg>
  )
}
