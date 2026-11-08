import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Perspective({ size = 24, ...props }: IconProps) {
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
      <path d="M18.79 4.02C19.085 3.96 19.394 4.03 19.629 4.22C19.863 4.41 20 4.7 20 5V20C19.999 20.27 19.845 20.57 19.653 20.76C19.403 20.95 19.027 21.05 18.726 20.96L4.726 16.96C4.35 16.85 4.063 16.46 4 16.08V8C4 7.53 4.33 7.12 4.79 7.02L18.79 4.02Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M13 1V11H23V13H13V23H11V13H1V11H11V1H13Z" fill="currentColor"/>
    </svg>
  )
}
