import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Captions({ size = 24, ...props }: IconProps) {
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
      <path d="M2 4L22 4L22 20L2 20L2 4ZM10.8 10.6L10 10C9.5673 9.6754 9.0409 9.5 8.5 9.5C7.1193 9.5 6 10.6193 6 12C6 13.3807 7.1193 14.5 8.5 14.5C9.0409 14.5 9.5673 14.3246 10 14L10.8 13.4M18.8 10.6L18 10C17.5673 9.6754 17.0409 9.5 16.5 9.5C15.1193 9.5 14 10.6193 14 12C14 13.3807 15.1193 14.5 16.5 14.5C17.0409 14.5 17.5673 14.3246 18 14L18.8 13.4"/>
    </svg>
  )
}
