import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bus({ size = 24, ...props }: IconProps) {
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
      <path d="M5 19L2 19C1.4477 19 1 18.5523 1 18L1 4C1 3.4477 1.4477 3 2 3L17.964 3C18.1565 3 18.3449 3.0556 18.5066 3.16C21.308 4.9695 23 8.0768 23 11.4118L23 18C23 18.5523 22.5523 19 22 19L5 19Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 18L15 18M9 18C9 19.1046 8.1046 20 7 20C5.8954 20 5 19.1046 5 18C5 16.8954 5.8954 16 7 16C8.1046 16 9 16.8954 9 18ZM19 18C19 19.1046 18.1046 20 17 20C15.8954 20 15 19.1046 15 18C15 16.8954 15.8954 16 17 16C18.1046 16 19 16.8954 19 18ZM5 18L2 18L2 4L17.964 4C20.4802 5.6253 22 8.4163 22 11.4118L22 18L19 18M14 4L14 9L17 12L22 12M14 9L2 9M8 9L8 4" fill="none"/>
    </svg>
  )
}
