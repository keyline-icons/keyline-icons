import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TagHorizontalStartPercent({ size = 24, ...props }: IconProps) {
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
      <path d="M22 3C22.5523 3 23 3.4477 23 4L23 20C23 20.5523 22.5523 21 22 21L9.1716 21C8.8874 21 8.6167 20.8791 8.427 20.6675L1.2554 12.6675C0.9149 12.2876 0.9149 11.7124 1.2554 11.3325L8.427 3.3325C8.6167 3.1209 8.8874 3 9.1716 3L22 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10.9571 15.2929L17.5429 8.7071"/>
      <path d="M12.75 8.5C12.75 9.3284 12.0784 10 11.25 10C10.4216 10 9.75 9.3284 9.75 8.5C9.75 7.6716 10.4216 7 11.25 7C12.0784 7 12.75 7.6716 12.75 8.5ZM18.75 15.5C18.75 16.3284 18.0784 17 17.25 17C16.4216 17 15.75 16.3284 15.75 15.5C15.75 14.6716 16.4216 14 17.25 14C18.0784 14 18.75 14.6716 18.75 15.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
