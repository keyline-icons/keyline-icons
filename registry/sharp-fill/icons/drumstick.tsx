import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Drumstick({ size = 24, ...props }: IconProps) {
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
      <path d="M4.5 12.46C5.229 12.46 5.97 12.72 6.563 13.14L6.719 13.54C7.478 15.34 9.006 16.77 10.857 17.43C11.283 18.03 11.535 18.77 11.535 19.5C11.535 21.37 9.974 22.9 8.125 23C6.219 23 4.577 21.37 4.535 19.47C2.835 19.35 1.168 17.83 1 16.15C1 14.21 2.567 12.46 4.5 12.46Z" fill="currentColor"/>
      <path d="M16.001 1L16.359 1.01L16.704 1.03C20.239 1.39 23 4.37 23 8C23 11.17 20.872 13.94 17.812 14.76L14.466 15.66C14.149 15.74 13.823 15.8 13.497 15.82L13.174 15.83C10.582 15.83 8.45 13.86 8.197 11.33L8.179 11.08L8.172 10.83C8.172 10.39 8.229 9.96 8.342 9.53L9.238 6.19C10.058 3.13 12.833 1 16.001 1Z" fill="currentColor"/>
    </svg>
  )
}
