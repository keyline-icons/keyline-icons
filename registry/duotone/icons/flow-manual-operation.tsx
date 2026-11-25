import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlowManualOperation({ size = 24, ...props }: IconProps) {
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
      <path d="M5.0028 5L18.9972 5C21.1004 5 22.5507 7.1079 21.7991 9.0722L18.7377 17.0722C18.2934 18.2333 17.179 19 15.9359 19L8.0641 19C6.821 19 5.7066 18.2333 5.2623 17.0722L2.2009 9.0722C1.4493 7.1079 2.8996 5 5.0028 5Z"/>
    </svg>
  )
}
