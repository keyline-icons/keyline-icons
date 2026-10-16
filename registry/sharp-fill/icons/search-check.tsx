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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M18 10C18 14.4183 14.4183 18 10 18C5.5817 18 2 14.4183 2 10C2 5.5817 5.5817 2 10 2C14.4183 2 18 5.5817 18 10ZM6.8672 10.8185L8.8115 12.8184C8.9998 13.012 9.2584 13.1213 9.5285 13.1213C9.8769 13.1213 10.2001 12.94 10.3818 12.6428L13.2669 7.9216L11.5604 6.8787L9.3472 10.5002L8.3012 9.4243L6.8672 10.8185Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M14.2929 14.2929L21.2929 21.2929"/>
    </svg>
  )
}
