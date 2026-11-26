import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ClipboardOff({ size = 24, ...props }: IconProps) {
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
      <path d="M4.8787 4.8787C4.3358 5.4215 4 6.1715 4 7L4 19C4 20.6569 5.3431 22 7 22L17 22C18.3538 22 19.4981 21.1033 19.8715 19.8715M20 14.3431L20 7C20 5.3431 18.6569 4 17 4M7.9527 2.2958C8.2573 2.1082 8.616 2 9 2L15 2C16.1046 2 17 2.8954 17 4L17 5C17 6.1046 16.1046 7 15 7L12.6569 7M2 2L22 22"/>
    </svg>
  )
}
