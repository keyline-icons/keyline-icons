import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Accessibility({ size = 24, ...props }: IconProps) {
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
      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2C17.5228 2 22 6.4772 22 12ZM8 11L16 11M12 11L12 13M10 17L12 13L14 17"/>
      <path d="M13.5 6.5C13.5 7.3284 12.8284 8 12 8C11.1716 8 10.5 7.3284 10.5 6.5C10.5 5.6716 11.1716 5 12 5C12.8284 5 13.5 5.6716 13.5 6.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
