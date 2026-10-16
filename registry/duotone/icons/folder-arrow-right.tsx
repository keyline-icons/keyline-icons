import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FolderArrowRight({ size = 24, ...props }: IconProps) {
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
      <path d="M2 7C2 4.7909 3.7909 3 6 3L8.6716 3C9.4672 3 10.2303 3.3161 10.7929 3.8787L12.1213 5.2071C12.3089 5.3946 12.5632 5.5 12.8284 5.5L18 5.5C20.2091 5.5 22 7.2909 22 9.5L22 10C22 10.5523 21.5523 11 21 11L14 11C12.3431 11 11 12.3431 11 14L11 20C11 20.5523 10.5523 21 10 21L6 21C3.7909 21 2 19.2091 2 17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15 17L21 17M18 14L21 17L18 20"/>
    </svg>
  )
}
