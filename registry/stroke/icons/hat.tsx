import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Hat({ size = 24, ...props }: IconProps) {
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
      <path d="M2 14C2 16.7614 4.23858 19 7 19H17C19.7614 19 22 16.7614 22 14M5.5 18.5L7.47557 6.6712C7.61331 5.7068 8.32851 5 9.16654 5H9.61971C9.77511 5 9.92751 5.0493 10.0607 5.1425L11.3385 6.037C11.5383 6.1769 11.767 6.2507 12 6.2507C12.233 6.2507 12.4617 6.1769 12.6615 6.037L13.9393 5.1425C14.0725 5.0493 14.2249 5 14.3803 5H14.8335C15.6715 5 16.3867 5.7068 16.5244 6.6712L18.5 18.5M6.57146 13H17.4285" fill="none"/>
    </svg>
  )
}
