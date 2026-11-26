import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PaperclipPlus({ size = 24, ...props }: IconProps) {
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
      <path d="M13.6716 5.8536L6.0126 13.5125C5.3292 14.1959 5.3292 15.304 6.0126 15.9874C6.696 16.6708 7.8041 16.6708 8.4875 15.9874L16.5 7.9749C17.8668 6.608 17.8668 4.392 16.5 3.0251C15.1332 1.6583 12.9171 1.6583 11.5503 3.0251L3.5377 11.0377C1.4875 13.0879 1.4874 16.4119 3.5377 18.4623C5.5881 20.5126 8.9121 20.5125 10.9623 18.4623L18 11.4246" strokeOpacity="0.4"/>
      <path d="M19 16V22M16 19H22"/>
    </svg>
  )
}
