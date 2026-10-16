import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CirclePlay({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2C17.5228 2 22 6.4772 22 12Z"/>
      <path d="M8.962734 9.105541C8.962734 8.320105 9.826684 7.841262 10.492732 8.257542L15.802266 11.576001C16.1156 11.771835 16.1156 12.228165 15.802266 12.423999L10.492732 15.742458C9.826684 16.158738 8.962734 15.679895 8.962734 14.894459Z"/>
    </svg>
  )
}
