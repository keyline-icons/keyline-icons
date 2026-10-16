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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12.7071 1.2929L20.7071 9.2929C20.9931 9.5789 21.0787 10.009 20.9239 10.3827C20.7691 10.7564 20.4045 11 20 11L17 11L17 22C17 22.5523 16.5523 23 16 23L8 23C7.4477 23 7 22.5523 7 22L7 11L4 11C3.5955 11 3.2309 10.7564 3.0761 10.3827C2.9213 10.009 3.0069 9.5789 3.2929 9.2929L11.2929 1.2929C11.6834 0.9024 12.3166 0.9024 12.7071 1.2929Z" fill="currentColor"/>
    </svg>
  )
}
