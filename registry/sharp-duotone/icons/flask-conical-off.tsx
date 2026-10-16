import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlaskConicalOff({ size = 24, ...props }: IconProps) {
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
      <path d="M8.3058 8.3047L20.4757 20.4746L20.9308 21.6338C20.9765 21.7501 21.0001 21.874 21.0001 21.999C21.0001 22.5513 20.5523 22.9989 20.0001 22.999L4.0001 22.999C3.4478 22.999 3.0001 22.5513 3.0001 21.999C3.0001 21.874 3.0237 21.7501 3.0694 21.6338L8.3058 8.3047Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M17.0001 3H15.5001V7.81055L16.4317 10.1816L14.5704 10.9131L13.5694 8.36523C13.5238 8.24885 13.5001 8.12502 13.5001 8V3H10.5001V4.84277H8.50009V3H7.00009V1H17.0001V3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.70709 1.70703L22.2929 22.2928"/>
    </svg>
  )
}
