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
      <path d="M15 18L9 18C9 16.8954 8.1046 16 7 16C5.8954 16 5 16.8954 5 18L2 18L2 9L14 9L17 12L22 12L22 18L19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18Z" fill="currentColor" stroke="none"/>
      <path d="M9 18L15 18M9 18C9 19.1046 8.1046 20 7 20C5.8954 20 5 19.1046 5 18C5 16.8954 5.8954 16 7 16C8.1046 16 9 16.8954 9 18ZM19 18C19 19.1046 18.1046 20 17 20C15.8954 20 15 19.1046 15 18C15 16.8954 15.8954 16 17 16C18.1046 16 19 16.8954 19 18ZM5 18L2 18L2 4L17.964 4C20.4802 5.6253 22 8.4163 22 11.4118L22 18L19 18M14 4L14 9L17 12L22 12M14 9L2 9M8 9L8 4" fill="none"/>
    </svg>
  )
}
