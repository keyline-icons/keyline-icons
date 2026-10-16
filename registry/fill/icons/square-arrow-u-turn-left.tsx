import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareArrowUTurnLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M18 2C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2H18ZM11.583 6.80176C11.1976 6.40661 10.5644 6.39802 10.1689 6.7832L7.45215 9.42969C6.84873 10.0175 6.84873 10.9825 7.45215 11.5703L10.1689 14.2168C10.5644 14.602 11.1976 14.5934 11.583 14.1982C11.9684 13.8026 11.9601 13.1686 11.5645 12.7832L10.2471 11.5H12.9199C14.0934 11.5 15 12.42 15 13.5C15 14.58 14.0934 15.5 12.9199 15.5H11.8936C11.3413 15.5001 10.8936 15.9478 10.8936 16.5C10.8936 17.0522 11.3413 17.4999 11.8936 17.5H12.9199C15.1482 17.5 17 15.7337 17 13.5C17 11.2663 15.1482 9.5 12.9199 9.5H10.2471L11.5645 8.2168C11.9601 7.83143 11.9684 7.19737 11.583 6.80176Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
