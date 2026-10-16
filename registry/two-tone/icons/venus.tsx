import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Venus({ size = 24, ...props }: IconProps) {
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
      <path d="M19 8C19 11.866 15.866 15 12 15C8.134 15 5 11.866 5 8C5 4.134 8.134 1 12 1C15.866 1 19 4.134 19 8Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18 8C18 11.3137 15.3137 14 12 14C8.6863 14 6 11.3137 6 8C6 4.6863 8.6863 2 12 2C15.3137 2 18 4.6863 18 8ZM12 14L12 22M8.5 19L15.5 19" fill="none"/>
    </svg>
  )
}
