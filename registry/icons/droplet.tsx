import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Droplet({ size = 24, ...props }: IconProps) {
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
      <path d="M17.6 9.8C18.5088 11.0117 19 12.4854 19 14C19 17.866 15.866 21 12 21C8.134 21 5 17.866 5 14C5 12.4854 5.4912 11.0117 6.4 9.8L11.2 3.4C11.3889 3.1482 11.6852 3 12 3C12.3148 3 12.6111 3.1482 12.8 3.4L17.6 9.8Z" fill="none"/>
    </svg>
  )
}
