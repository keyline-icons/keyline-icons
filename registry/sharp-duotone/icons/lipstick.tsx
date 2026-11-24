import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Lipstick({ size = 24, ...props }: IconProps) {
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
      <path d="M7 8.5007L7 2.0013C7 1.449 7.4477 1.0013 8 1.0013C8.1338 1.0013 8.2663 1.0282 8.3896 1.0803L16.3896 4.464C16.7596 4.6205 17 4.9832 17 5.385L17 14L18 14C18.5523 14 19 14.4477 19 15L19 22C19 22.5523 18.5523 23 18 23L6 23C5.4477 23 5 22.5523 5 22L5 15C5 14.4477 5.4477 14 6 14L7 14Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M7 12L7 8.5007L7 2.0013C7 1.449 7.4477 1.0013 8 1.0013C8.1338 1.0013 8.2663 1.0282 8.3896 1.0803L16.3896 4.464C16.7596 4.6205 17 4.9832 17 5.385L17 12Z" fill="currentColor"/>
    </svg>
  )
}
