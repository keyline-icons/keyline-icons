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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 3L9.5 3C9.7652 3 10.0196 3.1054 10.2071 3.2929L12.4142 5.5L21 5.5C21.5523 5.5 22 5.9477 22 6.5L22 20C22 20.5523 21.5523 21 21 21L3 21C2.4477 21 2 20.5523 2 20L2 4C2 3.4477 2.4477 3 3 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 3L9.5 3C9.677 3 9.8493 3.047 10 3.134L10 7L8 7Z" fill="currentColor" stroke="none"/>
      <path d="M9 9L9 12M9 12C10.1046 12 11 12.8954 11 14C11 15.1046 10.1046 16 9 16C7.8954 16 7 15.1046 7 14C7 12.8954 7.8954 12 9 12Z"/>
    </svg>
  )
}
