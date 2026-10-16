import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlaskRound({ size = 24, ...props }: IconProps) {
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
      <path d="M10.5 1L13.5 1C14.6046 1 15.5 1.8954 15.5 3L15.5 7.8063C18.2529 9.1456 20 11.9386 20 15C20 19.4183 16.4183 23 12 23C7.5817 23 4 19.4183 4 15C4 11.9386 5.7471 9.1456 8.5 7.8063L8.5 3C8.5 1.8954 9.3954 1 10.5 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10.5 2L13.5 2C14.0523 2 14.5 2.4477 14.5 3L14.5 7.8063C14.5 8.1889 14.7184 8.5381 15.0625 8.7055C17.4713 9.8774 19 12.3213 19 15C19 18.866 15.866 22 12 22C8.134 22 5 18.866 5 15C5 12.3213 6.5287 9.8774 8.9375 8.7055C9.2816 8.5381 9.5 8.1889 9.5 7.8063L9.5 3C9.5 2.4477 9.9477 2 10.5 2ZM8 2L16 2M5.0718 16L18.9282 16" fill="none"/>
    </svg>
  )
}
