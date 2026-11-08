import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowUpToLine({ size = 24, ...props }: IconProps) {
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
      <path d="M11.999 4.754C12.267 4.754 12.524 4.862 12.712 5.054L20.006 12.476L18.58 13.877L12.999 8.197V23H10.999V8.197L5.418 13.877L3.992 12.476L11.326 5.013C11.505 4.864 11.764 4.754 11.999 4.754Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M20 1V3H4V1H20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
