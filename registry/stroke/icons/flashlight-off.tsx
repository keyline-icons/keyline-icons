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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 12L10 12M8 8L4 8C2.8954 8 2 8.8954 2 10L2 14C2 15.1046 2.8954 16 4 16L9.7639 16C11.2344 16 12.6847 16.3424 14 17C15.2439 17.6219 16.6086 17.9619 17.997 17.997M17 7L17 11.3431M21.9749 16.318C21.9914 16.2144 22 16.1082 22 16L22 8C22 6.8954 21.1046 6 20 6L18.2361 6C16.7656 6 15.3153 6.3424 14 7C13.6946 7.1527 13.382 7.2883 13.0635 7.4067M2 2L22 22" fill="none"/>
    </svg>
  )
}
