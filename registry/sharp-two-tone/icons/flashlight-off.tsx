import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlashlightOff({ size = 24, ...props }: IconProps) {
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
      <path d="M19 19L18.2361 19C16.6103 19 15.0069 18.6215 13.5528 17.8944C12.3764 17.3062 11.0792 17 9.7639 17L2 17C1.4477 17 1 16.5523 1 16L1 8C1 7.4477 1.4477 7 2 7L7 7L19 19ZM10.6917 6.9491C11.6878 6.8393 12.6565 6.5538 13.5528 6.1056C15.0069 5.3785 16.6103 5 18.2361 5L22 5C22.5523 5 23 5.4477 23 6L23 18C23.0002 18.3293 22.8381 18.6376 22.5667 18.8241L10.6917 6.9491Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M9 12L12 12M8 8L2 8L2 16L9.7639 16C11.2344 16 12.6847 16.3424 14 17C15.2439 17.6219 16.6086 17.9619 17.997 17.997M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
