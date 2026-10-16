import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CloudMoon({ size = 24, ...props }: IconProps) {
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
      <path d="M10 22L19 22C20.6569 22 22 20.6569 22 19C22 17.3431 20.6569 16 19 16C19 13.5147 16.9853 11.5 14.5 11.5C12.0147 11.5 10 13.5147 10 16C8.3431 16 7 17.3431 7 19C7 20.6569 8.3431 22 10 22ZM5.0758 14.0249C3.1634 12.8397 2 10.7498 2 8.5C2 4.9101 4.9101 2 8.5 2C7.844 2.82 7.4866 3.8388 7.4866 4.8889C7.4866 6.5491 8.3766 8.0819 9.8184 8.905"/>
    </svg>
  )
}
