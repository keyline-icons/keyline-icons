import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ThumbsUp({ size = 24, ...props }: IconProps) {
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
      <path d="M4 10L8 10L9.6213 3.5149C9.8439 2.6246 10.6438 2 11.5616 2L13.2344 2C14.2431 2 15.0939 2.7511 15.219 3.7519L16 10L20 10C21.1046 10 22 10.8954 22 12C22 12.2398 21.9569 12.4777 21.8727 12.7022L18.8727 20.7022C18.5799 21.4829 17.8337 22 17 22L4 22C2.8954 22 2 21.1046 2 20L2 12C2 10.8954 2.8954 10 4 10ZM8 10L8 22" fill="none"/>
    </svg>
  )
}
