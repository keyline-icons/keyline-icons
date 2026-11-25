import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlowDisplay({ size = 24, ...props }: IconProps) {
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
      <path d="M20.6569 6.3431C22.1035 7.7898 23 9.7911 23 12C23 16.4183 19.4183 20 15 20L8 20C7.708 20 7.4306 19.8724 7.2406 19.6506L1.2429 12.6506C1.0876 12.4694 1.0023 12.2386 1.0023 12C1.0023 11.7614 1.0876 11.5306 1.2429 11.3494L7.2406 4.3494C7.4306 4.1276 7.708 4 8 4L15 4C17.2089 4 19.2102 4.8965 20.6569 6.3431Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
