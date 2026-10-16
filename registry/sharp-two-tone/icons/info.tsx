import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Info({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C17.937 1 23 6.0629 23 12C23 17.937 17.937 23 12 23C6.0629 23 1 17.937 1 12C1 6.0629 6.0629 1 12 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 2C17.5228 2 22 6.4771 22 12C22 17.5228 17.5228 22 12 22C6.4771 22 2 17.5228 2 12C2 6.4771 6.4771 2 12 2Z"/>
      <path d="M12 11L12 17"/>
      <path d="M13 8C13 8.5523 12.5523 9 12 9C11.4477 9 11 8.5523 11 8C11 7.4477 11.4477 7 12 7C12.5523 7 13 7.4477 13 8Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
