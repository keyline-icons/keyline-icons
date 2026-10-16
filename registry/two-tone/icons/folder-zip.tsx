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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 7C2 4.7909 3.7909 3 6 3L8.6716 3C9.4672 3 10.2303 3.3161 10.7929 3.8787L12.1213 5.2071C12.3089 5.3946 12.5632 5.5 12.8284 5.5L18 5.5C20.2091 5.5 22 7.2909 22 9.5L22 17C22 19.2091 20.2091 21 18 21L6 21C3.7909 21 2 19.2091 2 17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 7C3 5.3431 4.3431 4 6 4L8.6716 4C9.202 4 9.7107 4.2107 10.0858 4.5858L11.4142 5.9142C11.7893 6.2893 12.298 6.5 12.8284 6.5L18 6.5C19.6569 6.5 21 7.8431 21 9.5L21 17C21 18.6569 19.6569 20 18 20L6 20C4.3431 20 3 18.6569 3 17ZM9 4.0271L9 6M9 10L9 12M9 12C10.1046 12 11 12.8954 11 14C11 15.1046 10.1046 16 9 16C7.8954 16 7 15.1046 7 14C7 12.8954 7.8954 12 9 12Z"/>
    </svg>
  )
}
