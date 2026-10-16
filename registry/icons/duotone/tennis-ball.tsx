import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TennisBall({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2C12.2348 2.7627 12.3542 3.5562 12.3542 4.3542C12.3542 8.7725 8.7725 12.3542 4.3542 12.3542C3.5562 12.3542 2.7627 12.2348 2 12M12 22C11.7652 21.2373 11.6458 20.4438 11.6458 19.6458C11.6458 15.2275 15.2275 11.6458 19.6458 11.6458C20.4438 11.6458 21.2373 11.7652 22 12" fill="none" strokeOpacity="0.4"/>
      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2C17.5228 2 22 6.4772 22 12Z" fill="none"/>
    </svg>
  )
}
