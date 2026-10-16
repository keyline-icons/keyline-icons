import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Compass({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15.1026 7.6325C15.8844 7.3719 16.6281 8.1156 16.3675 8.8974L14.8162 13.5513C14.6172 14.1485 14.1485 14.6172 13.5513 14.8162L8.8974 16.3675C8.1156 16.6281 7.3719 15.8844 7.6325 15.1026L9.1838 10.4487C9.3828 9.8515 9.8515 9.3828 10.4487 9.1838L15.1026 7.6325Z"/>
    </svg>
  )
}
