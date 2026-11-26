import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DatabaseOff({ size = 24, ...props }: IconProps) {
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
      <path d="M7.934 2.2772C9.1255 2.1011 10.5155 2 12 2C16.4184 2 20 2.8954 20 4C20 5.1046 16.4184 6 12 6C11.8844 6 11.7694 5.9994 11.655 5.9982M4 4L4 20C4 21.1046 7.5816 22 12 22C16.4184 22 20 21.1046 20 20M20 14.3431L20 4M4 12C4 13.1046 7.5816 14 12 14C12.6693 14 13.3194 13.9795 13.9407 13.9407M2 2L22 22"/>
    </svg>
  )
}
