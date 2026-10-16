import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M1.5858 10.5858L8.5858 3.5858C8.8717 3.2999 9.2301 3.114 9.6098 3.0384C9.9894 2.9629 10.3918 2.9974 10.7654 3.1522C11.139 3.307 11.4479 3.567 11.663 3.8889C11.878 4.2107 12 4.5956 12 5L12 7L21 7C21.552 7 22.0534 7.2249 22.4142 7.5858C22.7751 7.9466 23 8.448 23 9L23 15C23 15.552 22.7751 16.0534 22.4142 16.4142C22.0534 16.7751 21.552 17 21 17L12 17L12 19C12 19.4044 11.878 19.7893 11.663 20.1111C11.4479 20.433 11.139 20.693 10.7654 20.8478C10.3918 21.0026 9.9894 21.0371 9.6098 20.9616C9.2301 20.886 8.8717 20.7001 8.5858 20.4142L1.5858 13.4142C1.1955 13.0239 1 12.5103 1 12C1 11.4897 1.1955 10.9761 1.5858 10.5858Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2.2929 11.2929L9.2929 4.2929C9.5789 4.0069 10.009 3.9213 10.3827 4.0761C10.7564 4.2309 11 4.5955 11 5L11 7C11 7.5523 11.4477 8 12 8L21 8C21.5523 8 22 8.4477 22 9L22 15C22 15.5523 21.5523 16 21 16L12 16C11.4477 16 11 16.4477 11 17L11 19C11 19.4045 10.7564 19.7691 10.3827 19.9239C10.009 20.0787 9.5789 19.9931 9.2929 19.7071L2.2929 12.7071C1.9024 12.3166 1.9024 11.6834 2.2929 11.2929Z"/>
    </svg>
  )
}
