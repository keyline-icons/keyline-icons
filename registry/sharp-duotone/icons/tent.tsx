import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Tent({ size = 24, ...props }: IconProps) {
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
      <path d="M2.3819 20.0001L11.1056 2.5528C11.275 2.214 11.6212 2 12 2C12.3788 2 12.725 2.214 12.8944 2.5528L21.6181 20.0001L23 20.0001L23 22.0001L1 22.0001L1 20.0001L2.3819 20.0001Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M11 22.0001L11 13C11 12.4477 11.4477 12 12 12C12.3788 12 12.725 12.214 12.8944 12.5528L17.6181 22.0001L11 22.0001Z" fill="currentColor"/>
    </svg>
  )
}
