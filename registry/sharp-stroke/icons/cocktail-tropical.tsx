import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CocktailTropical({ size = 24, ...props }: IconProps) {
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
      <path d="M7.792 2L16.208 2C15.9157 3.5275 15.512 5.0315 15 6.5C15 8.5 17 9 17 11C17 14 14.5 16 12 16C9.5 16 7 14 7 11C7 9 9 8.5 9 6.5C8.488 5.0315 8.0843 3.5275 7.792 2ZM9 6.5L15 6.5M12 16L12 22M7 22L8 22L16 22L17 22" fill="none"/>
    </svg>
  )
}
