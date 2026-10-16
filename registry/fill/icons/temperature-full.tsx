import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TemperatureFull({ size = 24, ...props }: IconProps) {
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
      <path d="M7 6C7 3.2386 9.2386 1 12 1C14.7614 1 17 3.2386 17 6L17 11.101C18.282 12.4094 19 14.1682 19 16C19 19.866 15.866 23 12 23C8.134 23 5 19.866 5 16C5 14.1682 5.718 12.4094 7 11.101L7 6ZM13 12.6459L13 6C13 5.4477 12.5523 5 12 5C11.4477 5 11 5.4477 11 6L11 12.6459C9.5167 13.0881 8.5 14.4522 8.5 16C8.5 17.933 10.067 19.5 12 19.5C13.933 19.5 15.5 17.933 15.5 16C15.5 14.4522 14.4833 13.0881 13 12.6459ZM13.5 16C13.5 16.8284 12.8284 17.5 12 17.5C11.1716 17.5 10.5 16.8284 10.5 16C10.5 15.1716 11.1716 14.5 12 14.5C12.8284 14.5 13.5 15.1716 13.5 16Z" fill="currentColor"/>
    </svg>
  )
}
