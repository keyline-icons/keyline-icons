import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GuidepointVerticalArrowLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M17 8C18.657 8 20 6.66 20 5C20 3.34 18.657 2 17 2C15.343 2 14 3.34 14 5C14 6.66 15.343 8 17 8ZM17 8V16M17 16C15.343 16 14 17.34 14 19C14 20.66 15.343 22 17 22C18.657 22 20 20.66 20 19C20 17.34 18.657 16 17 16ZM10 7.51L4 12L10 16.49V7.51Z"/>
    </svg>
  )
}
