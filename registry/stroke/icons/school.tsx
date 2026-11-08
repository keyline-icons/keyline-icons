import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function School({ size = 24, ...props }: IconProps) {
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
      <path d="M10.0005 21.9976V17.9986C10.0005 16.8988 10.8957 15.9991 12 15.9991C13.1043 15.9991 13.9995 16.8988 13.9995 17.9986V21.9976M17.9986 12V12.9998M17.9986 16.9988V17.9986M6.0014 12V12.9998M6.0014 16.9988V17.9986M6.0014 8.0009H4.0019C2.8976 8.0009 2.0024 8.9007 2.0024 10.0005V19.9981C2.0024 21.0978 2.8976 21.9976 4.0019 21.9976H19.9981C21.1024 21.9976 21.9976 21.0978 21.9976 19.9981V10.0005C21.9976 8.9007 21.1024 8.0009 19.9981 8.0009H17.9986V6.5413C17.9986 6.2014 17.8315 5.8914 17.5534 5.7015L12.5546 2.1723C12.2187 1.9424 11.7813 1.9424 11.4454 2.1723L6.4466 5.7015C6.1685 5.8914 6.0014 6.2014 6.0014 6.5413V8.0009ZM12 12C10.8957 12 10.0005 11.1002 10.0005 10.0005C10.0005 8.9007 10.8957 8.0009 12 8.0009C13.1043 8.0009 13.9995 8.9007 13.9995 10.0005C13.9995 11.1002 13.1043 12 12 12Z"/>
    </svg>
  )
}
