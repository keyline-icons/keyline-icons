import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SearchCheck({ size = 24, ...props }: IconProps) {
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
      <path d="M18 10C18 14.4183 14.4183 18 10 18C5.5817 18 2 14.4183 2 10C2 5.5817 5.5817 2 10 2C14.4183 2 18 5.5817 18 10ZM7.1617 11.1214L8.8115 12.8184C8.9998 13.012 9.2584 13.1213 9.5285 13.1213C9.8769 13.1213 10.2001 12.94 10.3818 12.6428L12.9746 8.4002C13.0705 8.2432 13.1213 8.0627 13.1213 7.8787C13.1213 7.3264 12.6736 6.8787 12.1213 6.8787C11.7729 6.8787 11.4497 7.06 11.268 7.3572L9.3472 10.5002L8.5957 9.7272C8.4074 9.5336 8.1488 9.4243 7.8787 9.4243C7.3264 9.4243 6.8787 9.872 6.8787 10.4243C6.8787 10.6846 6.9802 10.9347 7.1617 11.1214Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M15 15L21 21"/>
    </svg>
  )
}
