import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Postcard({ size = 24, ...props }: IconProps) {
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
      <path d="M12 3L19 3C21.2092 3 23 4.7908 23 7L23 17C23 19.2092 21.2092 21 19 21L5 21C2.7908 21 1 19.2092 1 17L1 7C1 4.7908 2.7908 3 5 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M16 7L17 7C18.1046 7 19 7.8954 19 9L19 11C19 12.1046 18.1046 13 17 13L15 13C13.8954 13 13 12.1046 13 11L13 9C13 7.8954 13.8954 7 15 7Z" fill="currentColor" stroke="none"/>
      <path d="M6 12H10M6 16H14"/>
    </svg>
  )
}
