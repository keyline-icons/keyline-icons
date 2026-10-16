import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleCaretLeft({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 1C17.937 1 23 6.0629 23 12C23 17.937 17.937 23 12 23C6.0629 23 1 17.937 1 12C1 6.0629 6.0629 1 12 1ZM6.5144 12.8742L15.5144 17.8742C16.1809 18.2445 17 17.7625 17 17L17 7C17 6.2375 16.1809 5.7555 15.5144 6.1258L6.5144 11.1258C5.8285 11.5068 5.8285 12.4932 6.5144 12.8742Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
