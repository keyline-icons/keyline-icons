import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Delete({ size = 24, ...props }: IconProps) {
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
      <path d="M2.264 11.323L8.4058 4.646C8.7845 4.2343 9.3183 4 9.8778 4L19 4C20.6569 4 22 5.3431 22 7L22 17C22 18.6569 20.6569 20 19 20L9.8778 20C9.3183 20 8.7845 19.7657 8.4058 19.354L2.264 12.677C1.912 12.2943 1.912 11.7057 2.264 11.323ZM11 9L17 15M17 9L11 15"/>
    </svg>
  )
}
