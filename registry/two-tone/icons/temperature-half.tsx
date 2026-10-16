import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TemperatureHalf({ size = 24, ...props }: IconProps) {
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
      <path d="M7 6C7 3.2386 9.2386 1 12 1C14.7614 1 17 3.2386 17 6L17 11.101C18.282 12.4094 19 14.1682 19 16C19 19.866 15.866 23 12 23C8.134 23 5 19.866 5 16C5 14.1682 5.718 12.4094 7 11.101L7 6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 6C8 3.7909 9.7909 2 12 2C14.2091 2 16 3.7909 16 6L16 11.101C16 11.3627 16.1026 11.614 16.2857 11.8009C17.3846 12.9224 18 14.4299 18 16C18 19.3137 15.3137 22 12 22C8.6863 22 6 19.3137 6 16C6 14.4299 6.6154 12.9224 7.7143 11.8009C7.8974 11.614 8 11.3627 8 11.101L8 6ZM12 16L12 9" fill="none"/>
      <path d="M13.5 16C13.5 16.8284 12.8284 17.5 12 17.5C11.1716 17.5 10.5 16.8284 10.5 16C10.5 15.1716 11.1716 14.5 12 14.5C12.8284 14.5 13.5 15.1716 13.5 16Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
