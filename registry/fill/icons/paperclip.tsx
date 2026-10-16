import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Paperclip({ size = 24, ...props }: IconProps) {
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
      <path d="M15.6716 6.8536L8.0126 14.5125C7.3292 15.1959 7.3292 16.304 8.0126 16.9874C8.696 17.6708 9.8041 17.6708 10.4875 16.9874L18.5 8.9749C19.8668 7.608 19.8668 5.392 18.5 4.0251C17.1332 2.6583 14.9171 2.6583 13.5503 4.0251L5.5377 12.0377C3.4875 14.0879 3.4874 17.4119 5.5377 19.4623C7.5881 21.5126 10.9121 21.5125 12.9623 19.4623L20 12.4246"/>
    </svg>
  )
}
