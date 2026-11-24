import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function IceSkate({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 4L12 9.0328C15.0214 9.2341 17.0144 10.3267 18.364 11.2762C19.4343 12.0292 20 13.2689 20 14.5135L20 15.5C20 16.8807 18.8807 18 17.5 18L11.5 18L5.5 18C4.1193 18 3 16.8807 3 15.5L3 6C3 5.5535 3.296 5.1611 3.7253 5.0385L10 3.2457L10 2C10 1.4477 10.4477 1 11 1C11.5523 1 12 1.4477 12 2Z" fill="currentColor" stroke="none"/>
      <path d="M7 17V22M14 17V22M3 22H19C20.1046 22 21 21.1046 21 20"/>
    </svg>
  )
}
