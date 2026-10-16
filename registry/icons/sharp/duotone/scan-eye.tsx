import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ScanEye({ size = 24, ...props }: IconProps) {
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
      <path d="M3 9L3 3L9 3M15 3L21 3L21 9M21 15L21 21L15 21M9 21L3 21L3 15" strokeOpacity="0.4"/>
      <path d="M13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5C12.8284 13.5 13.5 12.8284 13.5 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5.0164 11.8197C5.6345 8.4485 8.5726 6 12 6C15.4274 6 18.3655 8.4485 18.9836 11.8197C18.9945 11.8792 19 11.9395 19 12C19 12.0605 18.9945 12.1208 18.9836 12.1803C18.3655 15.5515 15.4274 18 12 18C8.5726 18 5.6345 15.5515 5.0164 12.1803C5.0055 12.1208 5 12.0605 5 12C5 11.9395 5.0055 11.8792 5.0164 11.8197ZM13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5C12.8284 13.5 13.5 12.8284 13.5 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
