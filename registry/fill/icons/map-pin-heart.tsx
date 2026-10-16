import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MapPinHeart({ size = 24, ...props }: IconProps) {
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
      <path d="M18.7082 16L12.7454 22.6667C12.5556 22.8788 12.2846 23 12 23C11.7154 23 11.4444 22.8788 11.2546 22.6667L5.2918 16C3.8159 14.3499 3 12.2138 3 10C3 5.0294 7.0294 1 12 1C16.9706 1 21 5.0294 21 10C21 12.2138 20.1841 14.3499 18.7082 16ZM11.3505 15.6014C11.5316 15.756 11.7619 15.841 12 15.841C12.2381 15.841 12.4684 15.756 12.6495 15.6014C14.1662 14.3059 16.99 12.5506 16.99 9.9533C16.99 8.0941 15.43 6.659 13.596 6.659C13.0124 6.659 12.4769 6.8056 12 7.059C11.5231 6.8056 10.9876 6.659 10.404 6.659C8.57 6.659 7.01 8.0941 7.01 9.9533C7.01 12.5506 9.8338 14.3059 11.3505 15.6014Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
