import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleOff({ size = 24, ...props }: IconProps) {
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
      <path d="M19.7782 19.7782C17.7876 21.7688 15.0376 23 12 23C5.9249 23 1 18.0751 1 12C1 8.9624 2.2312 6.2124 4.2218 4.2218ZM7.6385 3.3959C7.4 3.1574 7.2978 2.8148 7.3667 2.4847C7.4355 2.1546 7.6661 1.8813 7.98 1.758C9.2251 1.2686 10.5812 1 12 1C18.0751 1 23 5.9249 23 12C23 13.4188 22.7314 14.7749 22.2422 16.0201C22.1189 16.3341 21.8456 16.5648 21.5154 16.6336C21.1851 16.7025 20.8424 16.6002 20.6039 16.3617L7.6385 3.3959Z" fill="currentColor" stroke="none"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
