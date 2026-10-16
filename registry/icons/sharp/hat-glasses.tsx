import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HatGlasses({ size = 24, ...props }: IconProps) {
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
      <path d="M5 10L7 4L10 4L12 5.5L14 4L17 4L19 10M1 10L23 10M10 17C10 18.6569 8.6569 20 7 20C5.3431 20 4 18.6569 4 17C4 15.3431 5.3431 14 7 14C8.6569 14 10 15.3431 10 17ZM20 17C20 18.6569 18.6569 20 17 20C15.3431 20 14 18.6569 14 17C14 15.3431 15.3431 14 17 14C18.6569 14 20 15.3431 20 17ZM10 17C10 15.8954 10.8954 15 12 15C13.1046 15 14 15.8954 14 17"/>
    </svg>
  )
}
