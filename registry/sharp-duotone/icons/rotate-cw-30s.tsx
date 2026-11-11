import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RotateCw30s({ size = 24, ...props }: IconProps) {
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
      <path d="M20.5727 9.0828L20.7883 10.0593C20.929 10.6966 21 11.3473 21 12C21 16.9706 16.9706 21 12 21C7.0294 21 3 16.9706 3 12C3 7.0294 7.0294 3 12 3C14.4831 3 16.8559 4.0259 18.5568 5.8349L19.0133 6.3204M19.8369 2.1414L19.2001 6.5999L14.7414 5.9631" strokeOpacity="0.4"/>
      <path d="M6.8 9.5L10 9.5L8.1 12.2L8.35 12.2C9.2613 12.2 10 12.9387 10 13.85C10 14.7613 9.2613 15.5 8.35 15.5L8 15.5C7.6 15.5 7.25 15.4 6.95 15.15M14 11.25C14 10.2835 14.7835 9.5 15.75 9.5C16.7165 9.5 17.5 10.2835 17.5 11.25L17.5 13.75C17.5 14.7165 16.7165 15.5 15.75 15.5C14.7835 15.5 14 14.7165 14 13.75Z"/>
    </svg>
  )
}
