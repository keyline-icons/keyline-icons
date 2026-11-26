import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function EyeClosed({ size = 24, ...props }: IconProps) {
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
      <path d="M1.8 7.7333L2 8C4.3607 11.1476 8.0655 13 12 13C15.9345 13 19.6393 11.1476 22 8L22.2 7.7333M19.3473 10.6127L21.3142 13.3199L21.6137 13.7321M14.5989 12.7268L15.2946 15.9999L15.4346 16.6588M9.4011 12.7268L8.7054 16L8.5654 16.6588M4.6527 10.6127L2.6858 13.3199L2.3863 13.7321" fill="none"/>
    </svg>
  )
}
