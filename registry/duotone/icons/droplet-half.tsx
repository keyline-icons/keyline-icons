import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DropletHalf({ size = 24, ...props }: IconProps) {
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
      <path d="M18.4 9.2C19.4386 10.5848 20 12.269 20 14C20 18.4183 16.4183 22 12 22C7.5817 22 4 18.4183 4 14C4 12.269 4.5614 10.5848 5.6 9.2L10.4 2.8C10.7777 2.2965 11.3703 2 12 2C12.6297 2 13.2223 2.2965 13.5999 2.7999L18.4 9.2Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12 7C12 6.4477 12.4477 6 13 6C13.3148 6 13.6111 6.1482 13.8 6.4L16.8 10.4C17.5789 11.4386 18 12.7018 18 14C18 16.8512 15.9935 19.3085 13.2 19.8788C13.1342 19.8922 13.0672 19.899 13 19.899C12.4477 19.899 12 19.4513 12 18.899Z" fill="currentColor"/>
    </svg>
  )
}
