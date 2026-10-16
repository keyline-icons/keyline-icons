import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RocketVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M9.7794 21.8056L14.2206 21.8056L14.8292 22.4141C15.2042 22.7892 15.7129 22.9999 16.2434 22.9999C17.0627 22.9999 17.7991 22.5002 18.1018 21.7389L19.8584 17.3215C19.9519 17.0864 20 16.8356 20 16.5825C20 16.0521 19.7892 15.5434 19.4142 15.1683L17.0166 12.7708C17.0954 12.1749 17.135 11.5746 17.135 10.9735C17.135 7.5097 15.8236 4.1742 13.4644 1.6379C13.0861 1.2311 12.5556 1 12 1C11.4444 1 10.9139 1.2311 10.5356 1.6379C8.1764 4.1742 6.865 7.5097 6.865 10.9735C6.865 11.5746 6.9046 12.1749 6.9834 12.7708L4.5858 15.1683C4.2108 15.5434 4 16.0521 4 16.5825C4 16.8356 4.0481 17.0864 4.1416 17.3215L5.8982 21.7389C6.2009 22.5002 6.9373 22.9999 7.7566 22.9999C8.2871 22.9999 8.7958 22.7892 9.1708 22.4141L9.7794 21.8056Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14.6348 20.8056L15.9523 13.1206M9.3652 20.8056L8.0477 13.1206"/>
    </svg>
  )
}
