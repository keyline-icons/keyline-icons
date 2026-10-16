import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Banknote({ size = 24, ...props }: IconProps) {
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
      <path d="M23 17L23 7C23 5.3431 21.6569 4 20 4L4 4C2.3431 4 1 5.3431 1 7L1 17C1 18.6569 2.3431 20 4 20L20 20C21.6569 20 23 18.6569 23 17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 17L22 7C22 5.8954 21.1046 5 20 5L4 5C2.8954 5 2 5.8954 2 7L2 17C2 18.1046 2.8954 19 4 19L20 19C21.1046 19 22 18.1046 22 17ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM17 9L18 9M7 15L6 15"/>
    </svg>
  )
}
