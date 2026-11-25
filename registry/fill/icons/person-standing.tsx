import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PersonStanding({ size = 24, ...props }: IconProps) {
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
      <path d="M14.8284 7.8284C14.1057 8.5512 13.1043 9 12 9C9.7908 9 8 7.2092 8 5C8 2.7908 9.7908 1 12 1C14.2092 1 16 2.7908 16 5C16 6.1043 15.5512 7.1057 14.8284 7.8284Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M7 12H17M12 12V17M8 22L12 17L16 22"/>
    </svg>
  )
}
