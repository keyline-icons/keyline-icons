import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GarageOpen({ size = 24, ...props }: IconProps) {
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
      <path d="M23 22C23 22.552 22.552 23 22 23H2C1.448 23 1 22.552 1 22V8H23V22ZM6 21H18V11H6V21Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M11.66 1.06C11.916 0.967 12.201 0.982 12.447 1.105L22.236 6H1.764L11.553 1.105L11.66 1.06Z" fill="currentColor"/>
    </svg>
  )
}
