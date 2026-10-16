import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Send({ size = 24, ...props }: IconProps) {
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
      <path d="M2.4327 6.7465L21.7163 1.0411C21.8084 1.0138 21.9039 1 22 1C22.5523 1 23 1.4477 23 2C23 2.0961 22.9862 2.1916 22.9589 2.2837L17.2535 21.5673C17.0021 22.4169 16.2217 22.9999 15.3357 22.9999C14.6748 22.9999 14.0565 22.6734 13.6839 22.1275L9.1044 15.4197C8.9639 15.2139 8.7861 15.0361 8.5803 14.8956L1.8725 10.3161C1.3266 9.9435 1.0001 9.3252 1.0001 8.6643C1.0001 7.7783 1.5831 6.9979 2.4327 6.7465Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M22.7071 1.2929C22.8881 1.4739 23 1.7239 23 2C23 2.0961 22.9862 2.1916 22.9589 2.2837L17.2535 21.5673C17.0021 22.4169 16.2217 22.9999 15.3357 22.9999C14.6748 22.9999 14.0565 22.6734 13.6839 22.1275L9.1044 15.4197C9.0342 15.3168 8.9546 15.2209 8.8668 15.1332L22.7071 1.2929Z" fill="currentColor"/>
    </svg>
  )
}
