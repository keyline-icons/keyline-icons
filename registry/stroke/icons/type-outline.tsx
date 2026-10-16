import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TypeOutline({ size = 24, ...props }: IconProps) {
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
      <path d="M4 3L20 3C21.1046 3 22 3.8954 22 5L22 9C22 10.1046 21.1046 11 20 11C18.8954 11 18 10.1046 18 9C18 7.8954 17.1046 7 16 7C14.8954 7 14 7.8954 14 9L14 15C14 16.1046 14.8954 17 16 17C17.1046 17 18 17.8954 18 19C18 20.1046 17.1046 21 16 21L8 21C6.8954 21 6 20.1046 6 19C6 17.8954 6.8954 17 8 17C9.1046 17 10 16.1046 10 15L10 9C10 7.8954 9.1046 7 8 7C6.8954 7 6 7.8954 6 9C6 10.1046 5.1046 11 4 11C2.8954 11 2 10.1046 2 9L2 5C2 3.8954 2.8954 3 4 3Z"/>
    </svg>
  )
}
