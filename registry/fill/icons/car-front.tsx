import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CarFront({ size = 24, ...props }: IconProps) {
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
      <path d="M19.8245 9.4396C21.1603 10.1241 22.0004 11.499 22 13L22 18.0346C22.0002 19.6725 20.6724 21.0003 19.0346 21.0003C17.7688 21.0003 16.6425 20.1969 16.2306 19L7.7694 19C7.3575 20.1969 6.2312 21.0003 4.9654 21.0003C3.3276 21.0003 1.9998 19.6725 2 18.0346L2 13C1.9996 11.499 2.8397 10.1241 4.1755 9.4396L4.3941 8.7122C4.405 8.6758 4.418 8.6401 4.433 8.6053L5.8011 5.421C6.4322 3.952 7.8774 3 9.4762 3L14.5238 3C16.1226 3 17.5678 3.952 18.1989 5.421L19.567 8.6053C19.582 8.6401 19.595 8.6758 19.6059 8.7122L19.8245 9.4396ZM6.4402 9L17.5598 9L16.3613 6.2104C16.0458 5.476 15.3232 5 14.5238 5L9.4762 5C8.6768 5 7.9542 5.476 7.6387 6.2104L6.4402 9ZM9 13.5C9 12.9477 8.5523 12.5 8 12.5C7.4477 12.5 7 12.9477 7 13.5L7 14.5C7 15.0523 7.4477 15.5 8 15.5C8.5523 15.5 9 15.0523 9 14.5L9 13.5ZM17 13.5C17 12.9477 16.5523 12.5 16 12.5C15.4477 12.5 15 12.9477 15 13.5L15 14.5C15 15.0523 15.4477 15.5 16 15.5C16.5523 15.5 17 15.0523 17 14.5L17 13.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M5.35177 9L3.5 9M18.6482 9L20.5 9" fill="none"/>
    </svg>
  )
}
