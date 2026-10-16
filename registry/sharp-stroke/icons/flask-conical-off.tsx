import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlaskConicalOff({ size = 24, ...props }: IconProps) {
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
      <path d="M18.7058 18.7058L19.9999 22L4.0001 22L9.0769 9.0769M5.5715 18L18 18M9.5 4.8431L9.5 3.8431L9.5 2L14.5 2L14.5 8L15.0456 9.3887L15.5008 10.5475M7 2L17 2M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
