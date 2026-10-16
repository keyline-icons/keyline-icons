import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Timer({ size = 24, ...props }: IconProps) {
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
      <path d="M12 5C16.9706 5 21 9.0294 21 14C21 18.9706 16.9706 23 12 23C7.0294 23 3 18.9706 3 14C3 9.0294 7.0294 5 12 5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 6C16.4183 6 20 9.5817 20 14C20 18.4183 16.4183 22 12 22C7.5817 22 4 18.4183 4 14C4 9.5817 7.5817 6 12 6ZM9 2L15 2M12 2L12 6M12 14L12 10M17.6569 8.3431L19 7"/>
    </svg>
  )
}
