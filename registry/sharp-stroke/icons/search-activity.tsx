import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SearchActivity({ size = 24, ...props }: IconProps) {
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
      <path d="M17 10C17 11.933 16.217 13.683 14.95 14.95M17 10C17 6.134 13.866 3 10 3C6.134 3 3 6.134 3 10M17 10H12.5L11 12.5L9 7.5L7.5 10H3M14.95 14.95C13.683 16.217 11.933 17 10 17C6.134 17 3 13.866 3 10M14.95 14.95L14.293 14.293M14.95 14.95L21.293 21.293"/>
    </svg>
  )
}
