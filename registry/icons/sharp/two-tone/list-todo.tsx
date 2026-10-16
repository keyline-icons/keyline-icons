import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ListTodo({ size = 24, ...props }: IconProps) {
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
      <path d="M2 3L8 3C8.5523 3 9 3.4477 9 4L9 10C9 10.5523 8.5523 11 8 11L2 11C1.4477 11 1 10.5523 1 10L1 4C1 3.4477 1.4477 3 2 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11 7L23 7M11 18L23 18" fill="none" strokeOpacity="0.4"/>
      <path d="M2 4L8 4L8 10L2 10L2 4ZM1.7071 17.7071L4 20L8.2929 15.7071" fill="none"/>
    </svg>
  )
}
