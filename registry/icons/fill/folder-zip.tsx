import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FolderZip({ size = 24, ...props }: IconProps) {
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
      <path d="M2 7C2 4.7909 3.7909 3 6 3L8.6716 3C9.4672 3 10.2303 3.3161 10.7929 3.8787L12.1213 5.2071C12.3089 5.3946 12.5632 5.5 12.8284 5.5L18 5.5C20.2091 5.5 22 7.2909 22 9.5L22 17C22 19.2091 20.2091 21 18 21L6 21C3.7909 21 2 19.2091 2 17ZM8 5L8 6C8 6.5523 8.4477 7 9 7C9.5523 7 10 6.5523 10 6L10 5.9142L9.3787 5.2929C9.1912 5.1054 8.9368 5 8.6716 5L8 5ZM8 11.1716C6.8014 11.5954 6 12.7287 6 14C6 15.6569 7.3431 17 9 17C10.6569 17 12 15.6569 12 14C12 12.7287 11.1986 11.5954 10 11.1716L10 10C10 9.4477 9.5523 9 9 9C8.4477 9 8 9.4477 8 10ZM10 14C10 14.5523 9.5523 15 9 15C8.4477 15 8 14.5523 8 14C8 13.4477 8.4477 13 9 13C9.5523 13 10 13.4477 10 14Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
