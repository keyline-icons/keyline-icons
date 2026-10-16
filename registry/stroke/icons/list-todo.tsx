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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 5C2 4.4477 2.4477 4 3 4L7 4C7.5523 4 8 4.4477 8 5L8 9C8 9.5523 7.5523 10 7 10L3 10C2.4477 10 2 9.5523 2 9L2 5ZM2 18L4 20L8 16M12 7L22 7M12 18L22 18" fill="none"/>
    </svg>
  )
}
