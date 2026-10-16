import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleArrowUpRight({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C6.0629 1 1 6.0629 1 12C1 17.937 6.0629 23 12 23C17.937 23 23 17.937 23 12C23 6.0629 17.937 1 12 1ZM16 9L16 16L14 16L14 11.4141L9.4141 15.9998L8.0001 14.5858L12.5859 10L8 10L8 8L15 8C15.5523 8 16 8.4477 16 9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
