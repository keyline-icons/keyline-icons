import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigDownDash({ size = 24, ...props }: IconProps) {
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
      <path d="M12.7071 21.7071L19.7071 14.7071C19.9931 14.4211 20.0787 13.991 19.9239 13.6173C19.7691 13.2436 19.4045 13 19 13L17 13C16.4477 13 16 12.5523 16 12L16 7C16 6.4477 15.5523 6 15 6L9 6C8.4477 6 8 6.4477 8 7L8 12C8 12.5523 7.5523 13 7 13L5 13C4.5955 13 4.2309 13.2436 4.0761 13.6173C3.9213 13.991 4.0069 14.4211 4.2929 14.7071L11.2929 21.7071C11.6834 22.0976 12.3166 22.0976 12.7071 21.7071ZM8 2L16 2" fill="none"/>
    </svg>
  )
}
