import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function IvBag({ size = 24, ...props }: IconProps) {
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
      <path d="M11 17H5C4.448 17 4 16.5523 4 16V2C4 1.4477 4.448 1 5 1H12H19C19.552 1 20 1.4477 20 2V16C20 16.5523 19.552 17 19 17H13V22C13 22.5523 12.552 23 12 23H6V21H11V17Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12 10H5C4.448 10 4 10.4477 4 11V16C4 16.5523 4.448 17 5 17H19C19.552 17 20 16.5523 20 16V11C20 10.4477 19.552 10 19 10H12ZM13.5 6.5C13.5 7.3284 12.828 8 12 8C11.172 8 10.5 7.3284 10.5 6.5C10.5 5.6716 11.172 5 12 5C12.828 5 13.5 5.6716 13.5 6.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
