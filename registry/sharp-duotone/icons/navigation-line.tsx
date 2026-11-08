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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11.929 8.41C12.256 8.46 12.756 8.69 12.901 9L18.902 21.57C19.072 21.92 19.015 22.35 18.76 22.65C18.504 22.95 18.097 23.07 17.719 22.96L11.999 21.28L6.28 22.96C5.902 23.07 5.493 22.95 5.238 22.65C4.983 22.35 4.928 21.92 5.098 21.57L11.097 9C11.224 8.73 11.652 8.49 11.929 8.41Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M13 1V7H11V1H13Z" fill="currentColor"/>
    </svg>
  )
}
