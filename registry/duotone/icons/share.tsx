import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Share({ size = 24, ...props }: IconProps) {
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
      <path d="M9.4551 9.9845L14.5449 7.0155M9.4551 14.0155L14.5449 16.9845" strokeOpacity="0.4"/>
      <path d="M22 5C22 7.2092 20.2092 9 18 9C15.7908 9 14 7.2092 14 5C14 2.7908 15.7908 1 18 1C20.2092 1 22 2.7908 22 5ZM10 12C10 14.2092 8.2092 16 6 16C3.7908 16 2 14.2092 2 12C2 9.7908 3.7908 8 6 8C8.2092 8 10 9.7908 10 12ZM22 19C22 21.2092 20.2092 23 18 23C15.7908 23 14 21.2092 14 19C14 16.7908 15.7908 15 18 15C20.2092 15 22 16.7908 22 19Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
