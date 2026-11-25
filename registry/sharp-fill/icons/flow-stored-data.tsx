import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlowStoredData({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M15 20L9 20C4.5817 20 1 16.4183 1 12C1 7.5817 4.5817 4 9 4L21 4C22.1046 4 23 4.8954 23 6C23 6.6297 22.7035 7.2223 22.2001 7.5999C20.8151 8.6387 20 10.2689 20 12C20 13.7311 20.8151 15.3613 22.2 16.4C22.7035 16.7777 23 17.3703 23 18C23 19.1046 22.1046 20 21 20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
