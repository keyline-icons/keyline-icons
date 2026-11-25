import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlowDisplay({ size = 24, ...props }: IconProps) {
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
      <path d="M20.6569 6.3431C22.1035 7.7898 23 9.7911 23 12C23 16.4183 19.4183 20 15 20L8.886 20C8.0397 20 7.2327 19.6426 6.664 19.0157L1.5187 13.3438C0.8271 12.5814 0.8271 11.4186 1.5186 10.6562L6.6641 4.9843C7.2327 4.3574 8.0397 4 8.886 4L15 4C17.2089 4 19.2102 4.8965 20.6569 6.3431Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
