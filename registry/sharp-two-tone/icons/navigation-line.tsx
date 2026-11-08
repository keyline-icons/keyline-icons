import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function NavigationLine({ size = 24, ...props }: IconProps) {
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
      <path d="M11.999 8.43C12.384 8.43 12.735 8.65 12.901 9L18.902 21.57C19.072 21.93 19.017 22.35 18.762 22.65C18.506 22.95 18.097 23.07 17.719 22.96L12 21.28L6.281 22.96C5.903 23.07 5.494 22.95 5.238 22.65C4.983 22.35 4.928 21.93 5.098 21.57L11.097 9C11.263 8.65 11.614 8.43 11.999 8.43ZM12.999 7H10.999V1H12.999V7Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11.999 7V1M6 22L11.999 9.43L18 22L12 20.24L6 22Z"/>
    </svg>
  )
}
