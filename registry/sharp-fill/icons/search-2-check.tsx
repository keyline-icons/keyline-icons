import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Search2Check({ size = 24, ...props }: IconProps) {
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
      <path d="M20 11C20 15.9706 15.9706 20 11 20C6.0294 20 2 15.9706 2 11C2 6.0294 6.0294 2 11 2C15.9706 2 20 6.0294 20 11ZM7.8672 11.8185L9.8115 13.8184C9.9998 14.012 10.2584 14.1213 10.5285 14.1213C10.8769 14.1213 11.2001 13.94 11.3818 13.6428L14.2669 8.9216L12.5604 7.8787L10.3472 11.5002L9.3012 10.4243L7.8672 11.8185Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M16.2929 16.2929L21.2929 21.2929"/>
    </svg>
  )
}
