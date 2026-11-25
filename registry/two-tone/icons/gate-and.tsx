import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GateAnd({ size = 24, ...props }: IconProps) {
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
      <path d="M16.6569 6.3431C18.1035 7.7898 19 9.7911 19 12C19 16.4183 15.4183 20 11 20L9 20C7.3431 20 6 18.6569 6 17L6 7C6 5.3431 7.3431 4 9 4L11 4C13.2089 4 15.2102 4.8965 16.6569 6.3431Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 5L11 5C14.866 5 18 8.134 18 12C18 15.866 14.866 19 11 19L9 19C7.8954 19 7 18.1046 7 17L7 7C7 5.8954 7.8954 5 9 5ZM2 8L7 8M2 16L7 16M18 12L22 12"/>
    </svg>
  )
}
