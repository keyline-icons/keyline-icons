import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Move3d({ size = 24, ...props }: IconProps) {
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
      <path d="M8 16L12 13M12 13L16 16M12 13V10M8.4275 8.75L11.5659 3.25C11.7578 2.92 12.2422 2.92 12.4341 3.25L15.5725 8.75C15.763 9.08 15.5223 9.5 15.1384 9.5H8.8616C8.4777 9.5 8.237 9.08 8.4275 8.75ZM19.342 14.36L20.9821 20.38C21.0824 20.74 20.7449 21.08 20.3771 20.98L14.3634 19.34C13.9984 19.24 13.8771 18.78 14.1446 18.52L18.5182 14.14C18.7857 13.87 19.2424 14 19.342 14.36ZM4.658 14.36L3.0179 20.38C2.9176 20.74 3.2551 21.08 3.6229 20.98L9.6366 19.34C10.0016 19.24 10.1229 18.78 9.8554 18.52L5.4818 14.14C5.2143 13.87 4.7576 14 4.658 14.36Z"/>
    </svg>
  )
}
