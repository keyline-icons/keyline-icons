import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HomePlay({ size = 24, ...props }: IconProps) {
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
      <path d="M13.2928 3.47L20.2928 9.4C20.7414 9.78 21 10.34 21 10.93V19C21 20.1 20.1046 21 19 21H5C3.8954 21 3 20.1 3 19V10.93C3 10.34 3.2586 9.78 3.7072 9.4L10.7072 3.47C11.4532 2.84 12.5468 2.84 13.2928 3.47Z"/>
    </svg>
  )
}
