import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleSigma({ size = 24, ...props }: IconProps) {
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
      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2C17.5228 2 22 6.4772 22 12ZM15.3282 7.0077L9.2276 7.0077C8.765 7.0077 8.5057 7.5404 8.7909 7.9045L11.7319 11.6579C11.8893 11.8588 11.8893 12.1412 11.7319 12.3421L8.7909 16.0955C8.5057 16.4596 8.765 16.9923 9.2276 16.9923L15.3282 16.9923" fill="none"/>
    </svg>
  )
}
