import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Spiral({ size = 24, ...props }: IconProps) {
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
      <path d="M14 13C14 11.8954 13.1046 11 12 11C10.8954 11 10 11.8954 10 13C10 15.2091 11.7909 17 14 17C16.2091 17 18 15.2091 18 13C18 9.6863 15.3137 7 12 7C8.6863 7 6 9.6863 6 13C6 17.4183 9.5817 21 14 21C18.4183 21 22 17.4183 22 13C22 7.4772 17.5228 3 12 3C6.4772 3 2 7.4772 2 13"/>
    </svg>
  )
}
