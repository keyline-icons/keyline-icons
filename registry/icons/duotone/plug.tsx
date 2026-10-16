import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Plug({ size = 24, ...props }: IconProps) {
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
      <path d="M9 2L9 7M15 2L15 7M12 18L12 22" strokeOpacity="0.4"/>
      <path d="M8 6L16 6C18.2092 6 20 7.7908 20 10L20 11C20 15.4183 16.4183 19 12 19C7.5817 19 4 15.4183 4 11L4 10C4 7.7908 5.7908 6 8 6Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
