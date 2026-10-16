import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Airplay({ size = 24, ...props }: IconProps) {
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
      <path d="M13.6 13.4667L17.6 18.8C17.8596 19.1462 18 19.5673 18 20C18 21.1046 17.1046 22 16 22L8 22C6.8954 22 6 21.1046 6 20C6 19.5673 6.1404 19.1462 6.4 18.8L10.4 13.4667C10.7777 12.9631 11.3705 12.6667 12 12.6667C12.6295 12.6667 13.2223 12.9631 13.6 13.4667Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4.1043 15.8632C2.8523 15.4715 2 14.3118 2 13L2 6C2 4.3431 3.3431 3 5 3L19 3C20.6569 3 22 4.3431 22 6L22 13C22 14.3118 21.1477 15.4715 19.8957 15.8632M12.8 14.0667L16.8 19.4C17.2944 20.0592 16.824 21 16 21L8 21C7.176 21 6.7056 20.0592 7.2 19.4L11.2 14.0667C11.6 13.5333 12.4 13.5333 12.8 14.0667Z"/>
    </svg>
  )
}
