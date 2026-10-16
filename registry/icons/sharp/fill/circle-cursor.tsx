import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C17.937 1 23 6.0629 23 12C23 17.937 17.937 23 12 23C6.0629 23 1 17.937 1 12C1 6.0629 6.0629 1 12 1ZM6.2952 7.5961L9.8298 18.6891C10.1059 19.5556 11.3014 19.6336 11.6878 18.8105L14.0107 13.8623L18.8253 11.8667C19.6804 11.5122 19.6364 10.2862 18.758 9.994L8.4883 6.5781L7.4964 6.3238C6.7352 6.1287 6.0567 6.8474 6.2952 7.5961Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
